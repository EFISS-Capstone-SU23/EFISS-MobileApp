import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT,
} from '../constants/userConstants';

export const signin = (email, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
	try {
		// const { data } = await Axios.post('/api/users/signin', { email, password });
		const data = {
			email: 'vielongt52@gmail.com',
			password: '123456',
		};
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		await AsyncStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ type: USER_SIGNIN_FAIL, payload: error });
	}
};

export const signout = () => async (dispatch) => {
	await AsyncStorage.removeItem('userInfo');
	dispatch({ type: USER_SIGNOUT });
};
