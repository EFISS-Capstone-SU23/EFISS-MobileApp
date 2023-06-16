/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { config } from '../../config';
import {
	storeNewUserToken, storeNewRefreshToken, isTokenStillValid,
} from '../utils/utils';
import { signin, signout } from '../actions/userActions';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userToken, setUserToken] = useState(null);

	const login = async (username, password) => {
		dispatch(signin(username, password));
	};

	const logout = async () => {
		dispatch(signout());
	};

	const isLoggedIn = async () => {
		const tokenIsValid = await isTokenStillValid();
		if (!tokenIsValid) {
			logout();
		}
	};

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		isLoggedIn();
	}, []);

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<AuthContext.Provider value={{
			login,
			logout,
		}}
		>
			{children}
		</AuthContext.Provider>
	);
}
