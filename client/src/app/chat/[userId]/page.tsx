import Chat from '@/components/Chat';
import React from 'react';

const page = ({ params: { userId } }: { params: { userId: string } }) => {
	return <Chat receiverId={Number(userId)} />;
};

export default page;
