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
	} catch (error) {
		console.log('Error storing userTokenInitTime:', error);
	}
};

export const storeNewRefreshToken = async (token) => {
	try {
		const currentTime = getCurrentTime();
		await AsyncStorage.setItem('refreshToken', token);
		await AsyncStorage.setItem('refreshTokenInitTime', currentTime);
	} catch (error) {
		console.log('Error storing refreshTokenInitTime:', error);
	}
};

export const isTokenStillValid = async () => {
	const userTokenInitTime = await AsyncStorage.getItem('userTokenInitTime');
	const refreshTokenInitTime = await AsyncStorage.getItem('refreshTokenInitTime');

	// Check if userTokenInitTime or refreshTokenInitTime is null or undefined
	if (userTokenInitTime === null || refreshTokenInitTime === null) {
		return false; // Return false immediately as token information is not available
	}

	const currentTime = new Date().getTime(); // Get the current time in milliseconds
	const userTokenLifetime = 15 * 60 * 1000; // 15 mins converted to milliseconds
	const refreshTokenLifetime = 30 * 24 * 60 * 60 * 1000; // 30 days converted to milliseconds

	// eslint-disable-next-line max-len
	const isAccessTokenExpired = currentTime - new Date(userTokenInitTime).getTime() > userTokenLifetime;
	// eslint-disable-next-line max-len
	const isRefreshTokenExpired = currentTime - new Date(refreshTokenInitTime).getTime() > refreshTokenLifetime;

	if (isAccessTokenExpired) {
		if (isRefreshTokenExpired) {
			// Access and refresh tokens both expired, logout
			return false;
		}

		// Refresh token still valid, fetch a new access token
		const refreshToken = await AsyncStorage.getItem('refreshToken');
		const response = await axios.post(
			`${config.BE_BASE_API}/${config.REFRESH_TOKEN_ROUTER}`,
			{
				refreshToken,
			},
		);
		await storeNewUserToken(response.data.accessToken);
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

export const checkImageSize = (width, height) => {
	// Calculate the size of the image in bytes
	const imageSizeInBytes = width * height * 4; // Assuming 4 bytes per pixel (RGBA)

	// Convert the size to MB
	const imageSizeInMB = imageSizeInBytes / (1024 * 1024 * 10);
	console.log(imageSizeInMB);

	// Check if the image size exceeds the maximum allowed size (5MB)
	return imageSizeInMB < 5;
};
