'use client';

import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface ProvidersProps {
	children: ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ConfigProvider
					theme={{
						token: {
							colorText: '#fff',
						},
					}}
				>
					{children}
				</ConfigProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;
