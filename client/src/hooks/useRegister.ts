import axiosInstance from '@/utils/axiosInstance';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export function useRegister(
	options?: UseMutationOptions<
		AxiosResponse<any, any>,
		unknown,
		RegisterPayload,
		unknown
	>
) {
	return useMutation({
		mutationFn: (user: RegisterPayload) =>
			axiosInstance.post('/user/register', user),
		...options,
	});
}
