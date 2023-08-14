import { Button, Form, Input } from 'antd';
import React from 'react';
import { RegisterPayload, useRegister } from '@/hooks/useRegister';

interface RegisterProps {
	openLogin: () => void;
}

const Register = ({ openLogin }: RegisterProps) => {
	const { mutate } = useRegister({
		onSuccess: () => openLogin(),
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
			onFinish={registerUser}
			autoComplete="off"
		>
			<Form.Item
				label="First Name"
				name="firstName"
				rules={[{ required: true, message: 'Please input your first name!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Last Name"
				name="lastName"
				rules={[{ required: true, message: 'Please input your last name!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
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
