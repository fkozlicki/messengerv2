'use client';

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from 'next-auth/react';

interface LoginPayload {
	email: string;
	password: string;
}

interface LoginResponse {
	accessToken: string;
	refresh_token: string;
}

const authenticate = async (payload: LoginPayload) =>
	await signIn('credentials', { ...payload });

const Login = () => {
	const { push } = useRouter();
	const { mutate } = useMutation({
		mutationFn: authenticate,
	});

	const login = (values: LoginPayload) => {
		mutate(values);
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={login}
			autoComplete="off"
		>
			<Form.Item
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your username!' }]}
			>
				<Input className="text-black" />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password classNames={{ input: 'text-black' }} />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Login;
