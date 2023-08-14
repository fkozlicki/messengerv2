import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';

export function useSearch() {
	return useMutation({
		mutationFn: async (name: string) =>
			(
				await axiosInstance.post<User[]>('/user/search', undefined, {
					params: {
						name,
					},
				})
			).data,
	});
}
