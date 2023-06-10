/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { wishlistLoad } from '../actions/productActions';
import { config } from '../../config';
import { loadUserProfile } from '../actions/userActions';

export const AuthContext = createContext();

const getCurrentTime = () => {
	const currentTime = new Date().toISOString(); // Get the current time in ISO 8601 format
	return currentTime;
};

const storeLastOnlineTime = async () => {
	try {
		const currentTime = getCurrentTime();
		await AsyncStorage.setItem('lastOnline', currentTime);
		console.log('Last online time stored:', currentTime);
	} catch (error) {
		console.log('Error storing last online time:', error);
	}
};

const isTokenExpired = (lastOnline) => {
	const oneHourInMilliseconds = 60 * 60 * 1000; // Convert 1 hour to milliseconds
	const currentTime = new Date().getTime(); // Get the current time in milliseconds
	const storedTime = new Date(lastOnline).getTime(); // Convert the stored time to milliseconds

	return (currentTime - storedTime) > oneHourInMilliseconds;
};

export function AuthProvider({ children }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [userToken, setUserToken] = useState(null);

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

			storeLastOnlineTime();

			console.log('Token: ', response.data.token);
			setUserToken(response.data.token);
			await AsyncStorage.setItem('userToken', response.data.token);
			await AsyncStorage.setItem('refreshToken', response.data.refreshToken);

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
		await AsyncStorage.removeItem('userToken');
		await AsyncStorage.removeItem('refreshToken');
		await AsyncStorage.removeItem('lastOnline');
		setError(null);
		setIsLoading(false);
	};

	// useEffect(() => {
	// 	isLoggedIn();
	// }, []);

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<AuthContext.Provider value={{
			login,
			logout,
			isLoading,
			error,
			userToken,
		}}
		>
			{children}
		</AuthContext.Provider>
	);
}
