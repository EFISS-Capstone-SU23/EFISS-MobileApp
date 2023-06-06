import axios from 'axios';
import {
	USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
} from '../constants/userConstants';
import { config } from '../../config';

export const register = (registerData) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: registerData });
	try {
		const { data } = await axios.post(`${config.BE_BASE_API}/${config.SIGNUP_ROUTER}`, registerData);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({ type: USER_REGISTER_FAIL, payload: error });
	}
};
