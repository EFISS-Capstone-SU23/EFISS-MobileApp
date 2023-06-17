/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	isTokenStillValid,
} from '../utils/utils';
import { signin, signout } from '../actions/userActions';
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstants';

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
		dispatch({ type: USER_SIGNIN_REQUEST });
		const tokenIsValid = await isTokenStillValid();
		if (!tokenIsValid) {
			logout();
		} else {
			const token = await AsyncStorage.getItem('userToken');
			dispatch({ type: USER_SIGNIN_SUCCESS, payload: token });
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
