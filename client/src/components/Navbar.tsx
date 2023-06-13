'use client';

import { MessageFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React from 'react';

const Navbar = () => {
	return (
		<div className="py-4 flex flex-col h-full justify-between border-r border-slate-500">
			<div className="flex flex-col gap-2 justify-center items-center px-2">
				<Button size="large" className="leading-3" icon={<MessageFilled />} />
				<Button size="large" className="leading-3" icon={<UserOutlined />} />
			</div>
			<div className="flex justify-center">
				<Avatar size="large" icon={<UserOutlined />} />
			</div>
		</div>
	);
};

export default Navbar;
