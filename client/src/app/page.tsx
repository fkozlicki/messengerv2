import Authentication from '@/components/Authentication';
import { Conversation } from '@/components/ChatList';
import ChatPanel from '@/components/ChatPanel';
import { User } from '@/components/Profile';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Home = async () => {
	const session = await getServerSession(authOptions);

	if (session) {
		// NEXTJS-BUG: Since redirect function is throwing error for no reason we have to get it out of try-catch block
		let receiver: User | undefined;
		try {
			const conversations = (
				await axios.get<Conversation[]>(
					`http://localhost:8080/api/v1/conversation/all?userId=${session.user.id}`,
					{
						headers: {
							Authorization: `Bearer ${session.user.accessToken}`,
						},
					}
				)
			).data;
			if (conversations.length > 0) {
				const { userOne, userTwo } = conversations[0];
				receiver =
					userOne.id === userTwo.id
						? userOne
						: userOne.id === session.user.id
						? userTwo
						: userOne;
			}
		} catch (error) {
			console.error(error);
		}
		if (receiver) {
			redirect(`/chat/${receiver.id}`);
		}
	}

	return (
		<main className="w-screen h-screen grid place-content-center bg-[#191937]">
			{session ? <ChatPanel /> : <Authentication />}
		</main>
	);
};

export default Home;
