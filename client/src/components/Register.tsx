import { Button, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface AuthResponse {
	token: string;
}

const register = (payload: RegisterPayload) =>
	axios.post<AuthResponse>(
		'http://localhost:8080/api/v1/auth/register',
		payload
	);

interface RegisterProps {
	openLogin: () => void;
}

const Register = ({ openLogin }: RegisterProps) => {
	const { mutate } = useMutation(register, {
		onSuccess: () => {
			openLogin();
		},
	});

	const registerUser = (values: RegisterPayload) => {
		mutate(values);
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={registerUser}
			autoComplete="off"
		>
			<Form.Item
				label="First Name"
				name="firstName"
				rules={[{ required: true, message: 'Please input your first name!' }]}
			>
				<Input className="text-black" />
			</Form.Item>

			<Form.Item
				label="Last Name"
				name="lastName"
				rules={[{ required: true, message: 'Please input your last name!' }]}
			>
				<Input className="text-black" />
			</Form.Item>

			<Form.Item
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!' }]}
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

export default Register;
