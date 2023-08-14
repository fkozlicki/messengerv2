import { useUser } from '@/hooks/useUser';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import React from 'react';

interface ChatHeaderProps {
	userId: number;
}

const ChatHeader = ({ userId }: ChatHeaderProps) => {
	const { data: user, isLoading, isError } = useUser(userId);

	if (isError) {
		return <div>Something went wrong</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const { firstName, lastName } = user;

	return (
		<div className="w-full shadow p-1">
			<div className="flex gap-2">
				<div className="p-1">
					<Avatar size={36} icon={<UserOutlined />} />
				</div>
				<div>
					<Typography.Text className="block font-semibold text-base">
						{firstName} {lastName}
					</Typography.Text>
					<Typography.Text className="block">last active ??</Typography.Text>
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
