import React, { useState } from 'react';
import ChatPreview from './ChatPreview';
import { Button, Form, Input, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from './Profile';
import { useSession } from 'next-auth/react';
import { ArrowLeftOutlined } from '@ant-design/icons';

export interface Message {
	content: string;
	createdAt: string;
	id?: number;
	receiver: User;
	sender: User;
}

export interface Conversation {
	id: number;
	userOne: User;
	userTwo: User;
	messages: Message[];
}

const ChatList = () => {
	const [searchOpen, setSearchOpen] = useState<boolean>(false);
	const [form] = Form.useForm();
	const name = Form.useWatch('name', form);
	const { data: session } = useSession();
	const { data: conversations } = useQuery({
		queryKey: ['conversations'],
		queryFn: async () => {
			const data = (
				await axios.get<Conversation[]>(
					`http://localhost:8080/api/v1/conversation/all?userId=${session?.user.id}`,
					{
						headers: {
							Authorization: `Bearer ${session?.user.accessToken}`,
						},
					}
				)
			).data;
			return data;
		},
		enabled: !!session?.user.accessToken && !!session?.user.id,
	});
	const { data: searchedUsers } = useQuery({
		queryKey: ['search', name],
		queryFn: async () => {
			const data = (
				await axios.get<User[]>(
					`http://localhost:8080/api/v1/users/search?name=${name}`,
					{
						headers: {
							Authorization: `Bearer ${session?.user.accessToken}`,
						},
					}
				)
			).data;
			return data;
		},
		enabled: !!session?.user.accessToken && !!name,
	});

	const handleSearchOpen = () => {
		setSearchOpen(true);
	};

	const handleSearchClose = () => {
		setSearchOpen(false);
	};

	return (
		<div className="flex flex-col border-r border-slate-500 w-[360px]">
			<div className="p-4 ">
				<Typography className="text-2xl font-bold mb-4">Chats</Typography>
				<div className="flex gap-2">
					{searchOpen && (
						<Button
							icon={<ArrowLeftOutlined />}
							shape="circle"
							className="leading-3"
							onClick={handleSearchClose}
						/>
					)}
					<Form form={form} className="flex-1">
						<Form.Item name="name">
							<Input
								className="text-black rounded-full"
								placeholder="Search in Messenger"
								onFocus={handleSearchOpen}
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
			{searchOpen ? (
				searchedUsers &&
				searchedUsers?.length > 0 && (
					<div>
						{searchedUsers.map(({ id, firstName, lastName }, index) => (
							<ChatPreview
								key={index}
								userId={id}
								firstName={firstName}
								lastName={lastName}
								image=""
							/>
						))}
					</div>
				)
			) : (
				<div className="px-2 h-full">
					{conversations && conversations?.length > 0 ? (
						conversations?.map(({ userOne, userTwo, messages }, index) => {
							const receiver =
								userOne.id === userTwo.id
									? userOne
									: userOne.id === session?.user.id
									? userTwo
									: userOne;
							const { id, firstName, lastName } = receiver;

							return (
								<ChatPreview
									key={index}
									userId={id}
									firstName={firstName}
									lastName={lastName}
									lastMessage={messages[messages.length - 1]}
									image=""
								/>
							);
						})
					) : (
						<div className="flex h-full items-center justify-center">
							<Typography.Text className="text-xl">
								No messages found
							</Typography.Text>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ChatList;
