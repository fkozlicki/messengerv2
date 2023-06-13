'use client';

import React, { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

const Authentication = () => {
	const [login, setLogin] = useState(true);
	const { push } = useRouter();

	useEffect(() => {
		// const token = localStorage.getItem('accessToken');
		// if (token) {
		// 	push('/');
		// }
	}, []);

	const openLogin = () => {
		setLogin(true);
	};

	return (
		<div>
			<div className="flex gap-4 justify-center mb-8">
				<Button onClick={() => setLogin(true)}>Login</Button>
				<Button onClick={() => setLogin(false)}>Register</Button>
			</div>
			{login ? <Login /> : <Register openLogin={openLogin} />}
		</div>
	);
};

export default Authentication;
