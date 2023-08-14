import axiosInstance from '@/utils/axiosInstance';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useConversations(
	userId?: number,
	options?: Omit<
		UseQueryOptions<Conversation[], unknown, Conversation[], string[]>,
		'initialData'
	>
) {
	return useQuery({
		queryKey: ['conversations'],
		queryFn: async () =>
			(
				await axiosInstance.get<Conversation[]>('/conversation/all', {
					params: {
						userId,
					},
				})
			).data,
		enabled: !!userId,
		...options,
	});
}
