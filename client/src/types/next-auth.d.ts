import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		id: number;
	}

	interface Session {
		user: {
			id: number;
			firstName: string;
			lastName: string;
			email: string;
			refreshToken: string;
			accessToken: string;
		};
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		refreshToken: string;
		accessToken: string;
		exp?: number;
		iat?: number;
		jti?: string;
	}
}
