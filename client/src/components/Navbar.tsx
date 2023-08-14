import { useAuthContext } from '@/contexts/AuthContext';
import { LogoutOutlined, MessageFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps, Space, Typography } from 'antd';
import { useToken } from 'antd/es/theme/internal';
import React from 'react';

const Navbar = () => {
	const [, { colorBorderBg }] = useToken();
	const [, dispatch] = useAuthContext();

	const logout = () => {
		dispatch({ type: 'logout' });
	};

	const items: MenuProps['items'] = [
		{
			label: (
				<div onClick={logout} className="flex items-center gap-2">
					<LogoutOutlined className="text-lg bg-slate-100 p-2 rounded-full" />
					<Typography.Text className="text-base font-medium">
						Logout
					</Typography.Text>
				</div>
			),
			key: '0',
		},
	];

	return (
		<div
			className={`py-4 flex flex-col h-full justify-between border-r border-[${colorBorderBg}]`}
		>
			<div className="flex flex-col gap-2 justify-center items-center px-2">
				<Button icon={<MessageFilled />} />
				<Button icon={<UserOutlined />} />
			</div>
			<div className="flex justify-center">
				<Dropdown placement="topLeft" trigger={['click']} menu={{ items }}>
					<Avatar icon={<UserOutlined />} />
				</Dropdown>
			</div>
		</div>
	);
};

export default Navbar;
