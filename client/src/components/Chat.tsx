'use client';

import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputRef } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import ChatHeader from './ChatHeader';
import { useMessages } from '@/hooks/useMessages';
import { connect, sendMessage } from '@/lib/stomp';
import { useQueryClient } from '@tanstack/react-query';
import Message from './Message';
import { IMessage } from '@stomp/stompjs';

interface ChatProps {
	receiverId: number;
}

const Chat = ({ receiverId }: ChatProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [form] = Form.useForm();
	const inputRef = useRef<InputRef | null>(null);
	const [{ user }] = useAuthContext();
	const { isLoading } = useMessages(user!.id, receiverId, {
		onSuccess(data) {
			setMessages(data);
		},
	});
	const queryClient = useQueryClient();

	useEffect(() => {
		connect(user!.id, onMessageReceive);
	}, []);

	const onMessageReceive = (message: IMessage) => {
		if (isLoading) {
			return;
		}
		const serverMessage = JSON.parse(message.body) as Message;
		if (serverMessage.senderId === receiverId) {
			const clientMessage = {
				senderId: serverMessage.senderId,
				receiverId: serverMessage.receiverId,
				content: serverMessage.content,
			};
			setMessages((prev) => [...prev, clientMessage]);
		} else {
			queryClient.invalidateQueries(['conversations']);
		}
	};

	const onMessageSend = ({ content }: { content: string }) => {
		const message = {
			senderId: user!.id,
			receiverId,
			content,
		};
		sendMessage(JSON.stringify(message));
		if (user!.id !== receiverId) {
			setMessages((prev) => [...prev, message]);
		}
		form.resetFields();
		queryClient.invalidateQueries(['conversations']);
	};

	return (
		<div className="flex flex-col h-full">
			<ChatHeader userId={receiverId} />
			<div className="max-h-full flex-1 overflow-y-scroll">
				{isLoading ? (
					<div className="h-full grid place-items-center">
						Loading messages...
					</div>
				) : messages.length > 0 ? (
					<div className="flex flex-col p-4 flex-1">
						{messages.map((message, index) => (
							<Message
								key={index}
								userId={user!.id}
								senderId={message.senderId}
								content={message.content}
							/>
						))}
					</div>
				) : (
					<div className="h-full grid place-items-center">
						Start conversation
					</div>
				)}
			</div>
			<Form form={form} onFinish={onMessageSend} className="flex p-2 gap-2">
				<Form.Item
					className="flex-1 mb-0"
					name="content"
					rules={[{ required: true }]}
					help=""
				>
					<Input
						classNames={{ input: 'text-black rounded-full' }}
						placeholder="Aa"
						ref={inputRef}
						autoFocus
					/>
				</Form.Item>
				<Button
					type="default"
					htmlType="submit"
					shape="circle"
					icon={<SendOutlined />}
				/>
			</Form>
		</div>
	);
};

export default Chat;
