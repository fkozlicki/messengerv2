'use client';

import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AuthProvider from '@/contexts/AuthContext';
import StyledComponentsRegistry from './StyledComponentsRegistry';

interface ProvidersProps {
	children: ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<StyledComponentsRegistry>
					<ConfigProvider>{children}</ConfigProvider>
				</StyledComponentsRegistry>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default Providers;
