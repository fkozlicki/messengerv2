import { Avatar, Typography } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Message } from './ChatList';
import { calculateEllapsedTime } from '@/utils/calculateEllapsedTime';

interface ChatPreviewProps {
	image: string;
	userId: number;
	firstName: string;
	lastName: string;
	lastMessage?: Message;
}

const ChatPreview = ({
	image,
	userId,
	firstName,
	lastName,
	lastMessage,
}: ChatPreviewProps) => {
	const params = useParams();

	return (
		<Link
			href={`/chat/${userId}`}
			className={`p-2 w-full flex justify-start gap-4 hover:bg-blue-950 rounded-lg ${
				userId === Number(params?.userId) ? 'bg-blue-950' : ''
			}`}
		>
			<div>
				<Avatar size={48} icon={<UserOutlined />} />
			</div>
			<div className="flex flex-col items-start">
				<Typography>
					{firstName} {lastName}
				</Typography>
				{lastMessage && (
					<Typography>
						{lastMessage.content} •{' '}
						{calculateEllapsedTime(lastMessage.createdAt)}
					</Typography>
				)}
			</div>
		</Link>
	);
};

export default ChatPreview;
