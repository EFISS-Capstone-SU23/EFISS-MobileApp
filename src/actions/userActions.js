import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
	USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT,
	USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
	USER_LOAD_PROFILE_REQUEST, USER_LOAD_PROFILE_SUCCESS, USER_LOAD_PROFILE_FAIL,
	USER_CHANGE_PASSWORD_REQUEST, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_FAIL,
	USER_REPORT_BUG_REQUEST, USER_REPORT_BUG_SUCCESS, USER_REPORT_BUG_FAIL,
	USER_SEND_RESET_PASSWORD_REQUEST, USER_SEND_RESET_PASSWORD_SUCCESS,
	USER_SEND_RESET_PASSWORD_FAIL,
	USER_SEND_VERIFY_EMAIL_REQUEST, USER_SEND_VERIFY_EMAIL_SUCCESS,
	USER_SEND_VERIFY_EMAIL_FAIL,
} from '../constants/userConstants';
import { config } from '../../config';
import {
	storeNewUserToken, storeNewRefreshToken,
	isTokenStillValid, showSessionExpiredAlert,
} from '../utils/utils';

export const register = (registerData) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: registerData });
	try {
		const { data } = await axios.post(`${config.BE_BASE_API}/${config.SIGNUP_ROUTER}`, registerData);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: USER_REGISTER_FAIL, payload: error });
	}
};

export const signin = (username, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
	try {
		const { data } = await axios.post(
			`${config.BE_BASE_API}/${config.SIGNIN_ROUTER}`,
			{
				username,
				password,
			},
		);
		await storeNewUserToken(data.accessToken);
		await storeNewRefreshToken(data.refreshToken);
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.accessToken });
	} catch (error) {
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const signout = () => async (dispatch) => {
	await AsyncStorage.removeItem('userToken');
	await AsyncStorage.removeItem('refreshToken');
	await AsyncStorage.removeItem('userTokenInitTime');
	await AsyncStorage.removeItem('refreshTokenInitTime');
	dispatch({ type: USER_SIGNOUT });
};

export const loadUserProfile = () => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: USER_LOAD_PROFILE_REQUEST, payload: userToken });
		try {
			const { data } = await axios.get(
				`${config.BE_BASE_API}/${config.PROFILE_ROUTER}`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: USER_LOAD_PROFILE_SUCCESS, payload: data.account });
		} catch (error) {
			console.log(error.message);
			dispatch({ type: USER_LOAD_PROFILE_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const updateUserProfile = (userData) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: userData });
		try {
			const { data } = await axios.put(
				`${config.BE_BASE_API}/${config.PROFILE_ROUTER}`,
				userData,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			let info = await AsyncStorage.getItem('userInfo');
			info = JSON.parse(info); // Parse the info string into an object
			info = { ...info, ...userData }; // Update using spread operator
			info = JSON.stringify(info); // Convert the updated info object back to a string
			await AsyncStorage.setItem('userInfo', info); // Store the updated info string in AsyncStorage
			dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const passwordChange = (values) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: USER_CHANGE_PASSWORD_REQUEST, payload: values });
		try {
			const { data } = await axios.post(
				`${config.BE_BASE_API}/${config.CHANGE_PASSWORD_ROUTER}`,
				values,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: data });
		} catch (error) {
			dispatch({ type: USER_CHANGE_PASSWORD_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const sendBugReport = (values) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: USER_REPORT_BUG_REQUEST, payload: values });
		try {
			const { data } = await axios.post(
				`${config.BE_BASE_API}/${config.REPORT_BUG}`,
				values,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: USER_REPORT_BUG_SUCCESS, payload: data });
		} catch (error) {
			console.error(error);
			dispatch({ type: USER_REPORT_BUG_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const passwordSendReset = (values) => async (dispatch) => {
	dispatch({ type: USER_SEND_RESET_PASSWORD_REQUEST, payload: values });
	console.log(values);
	try {
		const { data } = await axios.post(
			`${config.BE_BASE_API}/${config.SEND_RESET_PASSWORD}`,
			values,
		);
		dispatch({ type: USER_SEND_RESET_PASSWORD_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_SEND_RESET_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const sendVerifyEmail = () => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: USER_SEND_VERIFY_EMAIL_REQUEST, payload: userToken });
		try {
			const { data } = await axios.post(
				`${config.BE_BASE_API}/${config.VERIFY_EMAIL_ROUTER}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: USER_SEND_VERIFY_EMAIL_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: USER_SEND_VERIFY_EMAIL_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};
