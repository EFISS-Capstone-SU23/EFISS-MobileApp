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

			setUserToken(response.data.token);
			await AsyncStorage.setItem('userToken', response.data.token);
			await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
			dispatch(wishlistLoad(response.data.token));
			dispatch(loadUserProfile(response.data.token));

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
	// try {
	// 	setIsLoading(true);

	// 	const token = await AsyncStorage.getItem('userToken');
	// 	if (token !== null) {
	// 		setUserToken(token);
	// 		dispatch(wishlistLoad(token));
	// 		dispatch(loadUserProfile(token));
	// 	}
	// 	setIsLoading(false);
	// } catch (err) {
	// 	console.log(`isLoggedIn: ${err.message}`);
	// }
	const isLoggedIn = async () => {
		try {
			setIsLoading(true);
			const refToken = await AsyncStorage.getItem('refreshToken');
			const token = await AsyncStorage.getItem('userToken');
			if (refToken !== null && token !== null) {
				const lastOnline = await AsyncStorage.getItem('lastOnline');
				console.log('Last token retrieved:', lastOnline);
				const isExpired = isTokenExpired(lastOnline);
				console.log('Is access token expired?', isExpired);
				// Do further actions based on the expiration status

				// if the access token is expired, get a new one by refreshToken
				if (isExpired) {
					console.log('Get a new acess Token');
					const response = await axios.post(
						`${config.BE_BASE_API}/${config.REFRESH_TOKEN_ROUTER}`,
						{
							refreshToken: refToken,
						},
					);
					storeLastOnlineTime();

					setUserToken(response.data.token);
					await AsyncStorage.setItem('userToken', response.data.token);
					dispatch(wishlistLoad(response.data.token));
					dispatch(loadUserProfile(response.data.token));
				} else {
					console.log('Token still valid');
					setUserToken(token);
					dispatch(loadUserProfile(token));
					dispatch(wishlistLoad(token));
				}
			} else logout();
			setIsLoading(false);
		} catch (err) {
			console.log('Error retrieving last online time:', err);
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
		}}
		>
			{children}
		</AuthContext.Provider>
	);
}
