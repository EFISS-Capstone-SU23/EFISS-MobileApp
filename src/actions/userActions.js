import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
	USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
	USER_LOAD_PROFILE_REQUEST, USER_LOAD_PROFILE_SUCCESS, USER_LOAD_PROFILE_FAIL,
	USER_CHANGE_PASSWORD_REQUEST, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_FAIL,
} from '../constants/userConstants';
import { config } from '../../config';

export const register = (registerData) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: registerData });
	try {
		const { data } = await axios.post(`${config.BE_BASE_API}/${config.SIGNUP_ROUTER}`, registerData);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
	} catch (error) {
		console.log('register error: ', error.response.data.message);
		dispatch({ type: USER_REGISTER_FAIL, payload: error });
	}
};

export const loadUserProfile = (userToken) => async (dispatch) => {
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
		dispatch({ type: USER_LOAD_PROFILE_SUCCESS, payload: data.user });
	} catch (error) {
		console.log('loadUserProfile error: ', error.response.data.message);
		dispatch({ type: USER_LOAD_PROFILE_FAIL, payload: error });
	}
};

export const updateUserProfile = (userToken, userData) => async (dispatch) => {
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
		console.log('updateUserProfile error: ', error.response.data.message);
		dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error });
	}
};

export const passwordChange = (userToken, values) => async (dispatch) => {
	dispatch({ type: USER_CHANGE_PASSWORD_REQUEST, payload: values });
	try {
		console.log(values);
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
		console.log('passwordChange error: ', error.response.data.message);
		dispatch({ type: USER_CHANGE_PASSWORD_FAIL, payload: error });
	}
};
