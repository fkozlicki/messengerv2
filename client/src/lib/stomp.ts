import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let client: CompatClient | null = null;

export const connect = (
	userId: number,
	onMessageReceived: (message: IMessage) => void
) => {
	client = Stomp.over(() => new SockJS(`http://localhost:8080/ws`));
	client.connect({}, () =>
		client?.subscribe(`/user/${userId}/queue/messages`, onMessageReceived)
	);
};

export const sendMessage = (message: string) => {
	if (client) {
		client.send('/app/conversation', {}, message);
	}
};
