'use client';

import { SendOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Button, Form, Input, InputRef, Space, Typography } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { User } from './Profile';
import { useParams, useRouter } from 'next/navigation';
import SockJS from 'sockjs-client';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { Conversation, Message } from './ChatList';

let client: CompatClient | null = null;
const Chat = () => {
	const { data: session, status } = useSession();
	const [messages, setMessages] = useState<Message[]>([]);
	const [form] = Form.useForm();
	const inputRef = useRef<InputRef | null>(null);
	const { push } = useRouter();
	const params = useParams();
	const receiverId = params?.userId;
	const {
		data: receiver,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['receiver'],
		queryFn: async () => {
			const data = (
				await axios.get<User>(
					`http://localhost:8080/api/v1/users/${receiverId}`,
					{
						headers: {
							Authorization: `Bearer ${session?.user.accessToken}`,
						},
					}
				)
			).data;
			return data;
		},
		enabled: !!session?.user.accessToken && !!receiverId,
	});
	useQuery({
		queryKey: ['conversation'],
		queryFn: async () => {
			const data = (
				await axios.get<Conversation>(
					`http://localhost:8080/api/v1/conversation?userOneId=${session?.user.id}&userTwoId=${params?.userId}`,
					{
						headers: {
							Authorization: `Bearer ${session?.user.accessToken}`,
						},
					}
				)
			).data;
			return data;
		},
		onSuccess(data) {
			if (data.messages) {
				setMessages(data.messages);
			}
		},
		enabled: !!session?.user.id && !!receiverId,
	});

	useEffect(() => {
		if (status === 'loading') {
			return;
		}

		if (status === 'unauthenticated') {
			push('/');
		} else {
			connect();
		}
	}, [session]);

	const connect = () => {
		const socket = new SockJS(`http://localhost:8080/ws`);
		client = Stomp.over(socket);
		client.connect({}, onConnected);
	};

	const onConnected = () => {
		if (client) {
			client.subscribe(
				`/user/${session?.user.id}/queue/messages`,
				onMessageReceived
			);
		}
	};

	const onMessageReceived = (message: IMessage) => {
		setMessages((prev) => [...prev, JSON.parse(message.body)]);
	};

	const sendMessage = (text: string) => {
		const message = {
			senderId: session?.user.id,
			receiverId,
			content: text,
		};
		client?.send('/app/conversation', {}, JSON.stringify(message));
	};

	const onFinish = ({ message }: { message: string }) => {
		sendMessage(message);
		form.resetFields();
		inputRef.current && inputRef.current.focus();
	};

	if (isLoading || isError) {
		return (
			<div className="flex h-full items-center justify-center">
				<Typography.Text className="text-2xl">
					Select chat or start new conversation
				</Typography.Text>
			</div>
		);
	}

	const { firstName, lastName } = receiver;

	return (
		<div className="flex flex-col h-full bg-[#191937]">
			<div className="w-full border-b border-slate-500 p-1">
				<div className="inline-flex gap-4 p-1">
					<Avatar size="large" icon={<UserOutlined />} />
					<div>
						<Typography.Text>
							{firstName} {lastName}
						</Typography.Text>
						<Typography>last avtive 55m</Typography>
					</div>
				</div>
			</div>
			<div className="max-h-full flex-1 overflow-y-scroll">
				<div className="flex flex-col p-4 flex-1">
					{messages ? (
						messages.map((message, index) => (
							<div
								key={index}
								className={`${
									session?.user.id === message.sender.id
										? 'self-end bg-[#0084ff]'
										: 'self-start bg-slate-500'
								} px-3 py-[6px] rounded-full mb-0.5`}
							>
								<Typography.Text>{message.content}</Typography.Text>
							</div>
						))
					) : (
						<Typography.Text>Start conversation</Typography.Text>
					)}
				</div>
			</div>
			<Form form={form} onFinish={onFinish} className="flex p-2">
				<Form.Item
					className="flex-1 mb-0"
					name="message"
					rules={[{ required: true }]}
					help=""
				>
					<Input
						classNames={{ input: 'text-black rounded-full' }}
						placeholder="Aa"
						ref={inputRef}
					/>
				</Form.Item>
				<Button
					className="leading-3 mx-2"
					type="default"
					htmlType="submit"
					shape="circle"
					icon={<SendOutlined className="ml-[2px]" />}
				/>
			</Form>
		</div>
	);
};

export default Chat;
