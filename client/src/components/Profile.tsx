'use client';

import { useQuery } from '@tanstack/react-query';
import { Col, Row, Space } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

const Profile = () => {
	// const { data, isLoading } = useQuery({
	// 	queryKey: ['userInfo'],
	// 	queryFn: async () =>
	// 		(
	// 			await axios.get('http://localhost:8080/api/v1/users/me', {
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	// 				},
	// 			})
	// 		).data,
	// 	onSuccess: (data) => {},
	// });

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	return <div>Profile</div>;
};

export default Profile;
