'use client';

import React from 'react';
import Navbar from './Navbar';
import ChatList from './ChatList';
import Chat from './Chat';

const ChatPanel = () => {
	return (
		<div className="w-screen h-screen bg-[#191937]">
			<div className="flex h-full">
				<div className="flex">
					<Navbar />
					<ChatList />
				</div>
				<div className="flex-1">
					<Chat />
				</div>
			</div>
		</div>
	);
};

export default ChatPanel;
