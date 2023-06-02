/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userToken, setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState(null);

	const login = async (username, password) => {
		setIsLoading(true);

		try {
			const response = await axios.post(
				'https://dummyjson.com/auth/login',
				{
					username,
					password,
				},
			);

			setUserToken(response.data.token);
			setUserInfo(response.data);
			setError(null);
			setIsLoading(false);
		} catch (err) {
			setError(err);
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUserToken(null);
		setUserInfo(null);
		setError(null);
		setIsLoading(false);
	};

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<AuthContext.Provider value={{
			login,
			logout,
			isLoading,
			error,
			userToken,
			userInfo,
		}}
		>
			{children}
		</AuthContext.Provider>
	);
}
