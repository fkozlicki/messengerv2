import React, { useState } from 'react';
import ChatPreview from './ChatPreview';
import { Button, Form, Input, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAuthContext } from '@/contexts/AuthContext';
import { useConversations } from '@/hooks/useConversations';
import { useSearch } from '@/hooks/useSearch';
import { useRouter, usePathname } from 'next/navigation';
import { useToken } from 'antd/es/theme/internal';

const ChatList = () => {
	const { push } = useRouter();
	const pathname = usePathname();
	const [searchOpen, setSearchOpen] = useState<boolean>(false);
	const [form] = Form.useForm();
	const [{ user }] = useAuthContext();
	const { data: conversations } = useConversations(user!.id, {
		onSuccess(data) {
			const firstConversation = data[0];
			if (pathname === '/' && firstConversation) {
				push(
					`/chat/${
						firstConversation.userOne.id === user!.id
							? firstConversation.userTwo.id
							: firstConversation.userOne.id
					}`
				);
			}
		},
	});
	const { mutate, data: searchedUsers, reset } = useSearch();
	const [, { colorBorderBg }] = useToken();

	const handleSearchOpen = () => {
		setSearchOpen(true);
	};

	const handleSearchClose = () => {
		setSearchOpen(false);
	};

	const onValuesChange = ({ name }: { name: string }) => {
		if (name.length === 0) {
			reset();
		} else {
			mutate(name);
		}
	};

	return (
		<div
			className={`flex flex-col border-r border-[${colorBorderBg}] w-[360px]`}
		>
			<div className="p-4 ">
				<Typography.Paragraph className="text-2xl font-bold mb-4">
					Chats
				</Typography.Paragraph>
				<div className="flex gap-2">
					{searchOpen && (
						<Button
							icon={<ArrowLeftOutlined />}
							shape="circle"
							onClick={handleSearchClose}
						/>
					)}
					<Form form={form} onValuesChange={onValuesChange} className="flex-1">
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
				searchedUsers && (
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
					{conversations && conversations.length > 0 ? (
						conversations.map(({ userOne, userTwo, lastMessage }, index) => {
							const receiver = userOne.id === user!.id ? userTwo : userOne;
							const { id, firstName, lastName } = receiver;

							return (
								<ChatPreview
									key={index}
									userId={id}
									firstName={firstName}
									lastName={lastName}
									lastMessage={lastMessage}
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
