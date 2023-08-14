'use client';

import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Button } from 'antd';

const Authentication = () => {
	const [login, setLogin] = useState(true);

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
