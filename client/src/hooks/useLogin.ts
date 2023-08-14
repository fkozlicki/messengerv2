import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '@/contexts/AuthContext';

export interface LoginPayload {
	email: string;
	password: string;
}

interface LoginResponse {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	accessToken: string;
	refreshToken: string;
}

export function useLogin() {
	const [, dispatch] = useAuthContext();

	return useMutation({
		mutationFn: async (user: LoginPayload) =>
			(await axiosInstance.post<LoginResponse>('/auth/login', user)).data,
		onSuccess: (data) => {
			const { accessToken, refreshToken, ...rest } = data;
			dispatch({ type: 'setTokens', payload: { accessToken, refreshToken } });
			dispatch({ type: 'setUser', payload: rest });
		},
	});
}
