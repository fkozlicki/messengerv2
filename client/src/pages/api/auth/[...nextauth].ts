import axios from 'axios';
import { JwtPayload, decode } from 'jsonwebtoken';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	accessToken: string;
	refreshToken: string;
}

export const authOptions: AuthOptions = {
	secret: process.env.SECRET,
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@email.com',
				},
				password: { label: 'Password', type: 'password', placeholder: '*****' },
			},
			authorize: async (credentials) => {
				if (!credentials) {
					return null;
				}

				try {
					const user = (
						await axios.post<User>(
							'http://localhost:8080/api/v1/auth/login',
							credentials
						)
					).data;

					return user;
				} catch (error) {
					console.error(error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user?.email) {
				return { ...token, ...user };
			}

			const accessTokenExpires = (decode(token.accessToken) as JwtPayload).exp;

			if (accessTokenExpires && Date.now() / 1000 < accessTokenExpires) {
				return { ...token, ...user };
			} else {
				const data = (
					await axios.post(
						'http://localhost:8080/api/v1/auth/refresh-token',
						{},
						{
							headers: {
								Authorization: `Bearer ${token.refreshToken}`,
							},
						}
					)
				).data;

				return { ...token, ...user, ...data };
			}
		},
		async session({ session, token }) {
			session.user = token as any;
			const accessTokenExpires = (decode(token.accessToken) as JwtPayload).exp;
			const refreshTokenExpires = (decode(token.refreshToken) as JwtPayload)
				.exp;
			if (
				accessTokenExpires &&
				Date.now() / 1000 > accessTokenExpires &&
				refreshTokenExpires &&
				Date.now() / 1000 > refreshTokenExpires
			) {
				return Promise.reject('Refresh token expired');
			}
			return session;
		},
	},
};
export default NextAuth(authOptions);
