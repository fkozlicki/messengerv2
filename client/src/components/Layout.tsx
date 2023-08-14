'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import React, { ReactNode, useEffect } from 'react';
import Authentication from './Authentication';
import Navbar from './Navbar';
import ChatList from './ChatList';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: ReactNode }) => {
	const [{ user }] = useAuthContext();
	const { push } = useRouter();

	useEffect(() => {
		if (user === null) {
			push('/');
		}
	}, [user]);

	return (
		<main className="w-screen h-screen grid place-content-center">
			{user ? (
				<div className="w-screen h-screen">
					<div className="flex h-full">
						<div className="flex">
							<Navbar />
							<ChatList />
						</div>
						<div className="flex-1">{children}</div>
					</div>
				</div>
			) : (
				<Authentication />
			)}
		</main>
	);
};

export default Layout;
