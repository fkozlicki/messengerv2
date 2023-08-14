import axiosInstance from '@/utils/axiosInstance';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface Message {
	senderId: number;
	receiverId: number;
	content: string;
}

export function useMessages(
	userOneId: number,
	userTwoId: number,
	options?: Omit<
		UseQueryOptions<Message[], unknown, Message[], string[]>,
		'initialData'
	>
) {
	return useQuery({
		queryKey: ['messages'],
		queryFn: async () =>
			(
				await axiosInstance.get<Message[]>('/conversation/messages', {
					params: {
						userOneId,
						userTwoId,
					},
				})
			).data,
		enabled: !!userOneId && !!userTwoId,
		refetchOnWindowFocus: false,
		...options,
		retry: false,
	});
}
