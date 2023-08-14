import { Typography } from 'antd';
import React from 'react';

interface MessageProps {
	userId: number;
	senderId: number;
	content: string;
}

const Message = ({ userId, senderId, content }: MessageProps) => {
	const styles =
		userId === senderId
			? {
					wrapper: 'self-end bg-[#0084ff]',
					text: 'text-white',
			  }
			: { wrapper: 'self-start bg-slate-300', text: 'text-black' };

	return (
		<div className={`${styles.wrapper} px-3 py-[6px] rounded-full mb-0.5`}>
			<Typography.Text className={styles.text}>{content}</Typography.Text>
		</div>
	);
};

export default Message;
