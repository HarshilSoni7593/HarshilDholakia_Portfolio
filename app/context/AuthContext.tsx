"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { AuthResponse } from "@/lib/api";

interface AuthContextType {
	user: AuthResponse | null;
	token: string | null;
	login: (authData: AuthResponse) => void;
	logout: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredAuth(): { token: string | null; user: AuthResponse | null } {
	if (typeof window === "undefined") {
		return { token: null, user: null };
	}

	try {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			return {
				token: storedToken,
				user: JSON.parse(storedUser),
			};
		}
	} catch (error) {
		console.error("Error reading from localStorage:", error);
	}

	return { token: null, user: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthResponse | null>(() => {
		const { user } = getStoredAuth();
		return user;
	});

	const [token, setToken] = useState<string | null>(() => {
		const { token } = getStoredAuth();
		return token;
	});

	const [isLoading, setIsLoading] = useState(false);

	const login = (authData: AuthResponse) => {
		setToken(authData.token);
		setUser(authData);

		try {
			localStorage.setItem("token", authData.token);
			localStorage.setItem("user", JSON.stringify(authData));
		} catch (error) {
			console.error("Error saving auth data to localStorage:", error);
		}
	};

	const logout = () => {
		setToken(null);
		setUser(null);

		try {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		} catch (error) {
			console.error("Error removing auth data from localStorage:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				login,
				logout,
				isAuthenticated: !!token,
				isLoading,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
