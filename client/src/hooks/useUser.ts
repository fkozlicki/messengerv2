import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/components/Profile';

export function useUser(userId?: number) {
	return useQuery({
		queryKey: ['conversations', userId],
		queryFn: async () =>
			(await axiosInstance.get<User>(`/user/${userId}`)).data,
		enabled: !!userId,
	});
}
