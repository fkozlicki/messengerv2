'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const SECRET_KEY =
	'2D4A614E645267556B58703272357538782F413F4428472B4B6250655368566D';

const AuthProvider = () => {
	const router = useRouter();

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		const refreshToken = localStorage.getItem('refresh_token');

		// if (!accessToken)

		// try {
		//   jwt.verify(accessToken, SECRET_KEY);
		// }
	});

	return null;
};

export default AuthProvider;
