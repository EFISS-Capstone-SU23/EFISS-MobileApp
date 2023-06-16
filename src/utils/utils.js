import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

import { config } from '../../config';
import { USER_SIGNOUT } from '../constants/userConstants';

export const formatNumber = (numberString) => {
	const number = parseInt(numberString, 10);
	const formattedNumber = number.toLocaleString('en-US', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
	return formattedNumber;
};

export const getCurrentTime = () => {
	const currentTime = new Date().toISOString(); // Get the current time in ISO 8601 format
	return currentTime;
};

export const storeNewUserToken = async (token) => {
	try {
		const currentTime = getCurrentTime();
		await AsyncStorage.setItem('userToken', token);
		await AsyncStorage.setItem('userTokenInitTime', currentTime);
		console.log('userTokenInitTime: ', currentTime);
	} catch (error) {
		console.log('Error storing userTokenInitTime:', error);
	}
};

export const storeNewRefreshToken = async (token) => {
	try {
		const currentTime = getCurrentTime();
		await AsyncStorage.setItem('refreshToken', token);
		await AsyncStorage.setItem('refreshTokenInitTime', currentTime);
		console.log('refreshTokenInitTime: ', currentTime);
	} catch (error) {
		console.log('Error storing refreshTokenInitTime:', error);
	}
};

export const isTokenStillValid = async () => {
	const userTokenInitTime = await AsyncStorage.getItem('userTokenInitTime');
	const userTokenLifetime = 6 * 60 * 60 * 1000; // Convert 6 hours to milliseconds

	const refreshTokenInitTime = await AsyncStorage.getItem('refreshTokenInitTime');
	const refreshTokenLifetime = 30 * 24 * 60 * 60 * 1000; // Convert 30 days to milliseconds

	const currentTime = new Date().getTime(); // Get the current time in milliseconds

	// Check if access token is expired
	if (currentTime - new Date(userTokenInitTime).getTime() > userTokenLifetime) {
		console.log('Access token is expired');
		// Access token expired
		if (currentTime - new Date(refreshTokenInitTime).getTime() > refreshTokenLifetime) {
			// Refresh token also expired, logout
			console.log('Refresh token is expired');
			return false;
		}
		// Refresh token still valid, fetch a new access token
		console.log('Get a new access Token');
		const refreshToken = await AsyncStorage.getItem('refreshToken');
		const response = await axios.post(
			`${config.BE_BASE_API}/${config.REFRESH_TOKEN_ROUTER}`,
			{
				refreshToken,
			},
		);
		await storeNewUserToken(response.data.token);
	}

	// Access token is not expired, continue the work
	return true;
};

export const showSessionExpiredAlert = (dispatch) => {
	Alert.alert(
		'Cảnh báo',
		'Phiên đăng nhập hết hạn',
		[
			{ text: 'OK', onPress: () => dispatch({ type: USER_SIGNOUT }) },
		],
	);
};
