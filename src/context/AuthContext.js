/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { wishlistLoad } from '../actions/productActions';
import { config } from '../../config';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userToken, setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState(null);

	const login = async (username, password) => {
		setIsLoading(true);

		try {
			const response = await axios.post(
				`${config.BE_BASE_API}/${config.SIGNIN_ROUTER}`,
				{
					username,
					password,
				},
			);

			setUserToken(response.data.token);
			setUserInfo(response.data);
			await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
			dispatch(wishlistLoad(response.data.token));

			setError(null);
			setIsLoading(false);
		} catch (err) {
			setError(err);
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setUserToken(null);
		setUserInfo(null);
		await AsyncStorage.removeItem('userInfo');
		setError(null);
		setIsLoading(false);
	};

	const isLoggedIn = async () => {
		try {
			setIsLoading(true);
			const info = await AsyncStorage.getItem('userInfo');
			if (info !== null) {
				setUserInfo(JSON.parse(info));
				setUserToken(JSON.parse(info).token);
				dispatch(wishlistLoad(userToken));
			}
			setIsLoading(false);
		} catch (err) {
			console.log(`isLoggedIn: ${err.message}`);
		}
	};

	useEffect(() => {
		isLoggedIn();
	}, []);

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
