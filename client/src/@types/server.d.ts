interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

interface Message {
	senderId: number;
	receiverId: number;
	content: string;
}

interface Conversation {
	userOne: User;
	userTwo: User;
	lastMessage: Message;
}
