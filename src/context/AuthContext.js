import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	// eslint-disable-next-line no-unused-vars
	const [isLoading, setIsLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [userToken, setUserToken] = useState(null);

	const login = () => {
		setUserToken('myTestToken');
		setIsLoading(false);
	};

	const logout = () => {
		setUserToken(null);
		setIsLoading(false);
	};

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<AuthContext.Provider value={{
			login,
			logout,
			isLoading,
			userToken,
		}}
		>
			{children}
		</AuthContext.Provider>
	);
}
