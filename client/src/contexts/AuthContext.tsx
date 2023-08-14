import useLocalStorage from '@/hooks/useLocalStorage';
import {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import jwtDecode from 'jwt-decode';

interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

interface Tokens {
	accessToken: string;
	refreshToken: string;
}

interface AuthState {
	user?: User | null;
	tokens?: Tokens | null;
}

const initialState: AuthState = {
	tokens: undefined,
	user: undefined,
};

type AuthAction =
	| { type: 'setTokens'; payload: Tokens }
	| { type: 'setUser'; payload: User }
	| { type: 'logout' };

const authReducer = (state: AuthState, action: AuthAction) => {
	if (action.type === 'setTokens') {
		localStorage.setItem('tokens', JSON.stringify(action.payload));
		return { ...state, tokens: action.payload };
	}
	if (action.type === 'setUser') {
		localStorage.setItem('user', JSON.stringify(action.payload));
		return { ...state, user: action.payload };
	}
	if (action.type === 'logout') {
		localStorage.setItem('tokens', JSON.stringify(null));
		localStorage.setItem('user', JSON.stringify(null));
		return initialState;
	}

	return state;
};

type AuthContext = [AuthState, Dispatch<AuthAction>];

const AuthContext = createContext<AuthContext>([initialState, () => null]);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const [tokens, setTokens] = useLocalStorage('tokens', null);
	const [user, setUser] = useLocalStorage('user', null);

	useEffect(() => {
		if (tokens) {
			const decoded = jwtDecode(tokens.refreshToken) as any;
			const now = new Date().getTime() / 1000;

			if (now > decoded.exp) {
				setTokens(null);
				setUser(null);
			} else {
				dispatch({ type: 'setTokens', payload: tokens });
				dispatch({ type: 'setUser', payload: user });
			}
		}
	}, [user, setUser, tokens, setTokens]);

	return (
		<AuthContext.Provider value={[state, dispatch]}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuthContext = (): AuthContext => useContext(AuthContext);
