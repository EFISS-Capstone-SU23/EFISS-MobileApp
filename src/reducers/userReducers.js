import {
	USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
	USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT,
	USER_LOAD_PROFILE_REQUEST, USER_LOAD_PROFILE_SUCCESS, USER_LOAD_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,
	USER_CHANGE_PASSWORD_REQUEST, USER_CHANGE_PASSWORD_SUCCESS,
	USER_CHANGE_PASSWORD_FAIL, USER_CHANGE_PASSWORD_RESET,
	USER_REPORT_BUG_REQUEST, USER_REPORT_BUG_SUCCESS, USER_REPORT_BUG_FAIL, USER_REPORT_BUG_RESET,
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
	case USER_REGISTER_REQUEST:
		return { loading: true };
	case USER_REGISTER_SUCCESS:
		return { loading: false, userInfo: action.payload };
	case USER_REGISTER_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

export const userSigninReducer = (state = {}, action) => {
	switch (action.type) {
	case USER_SIGNIN_REQUEST:
		return { loading: true };
	case USER_SIGNIN_SUCCESS:
		return { loading: false, userToken: action.payload, success: true };
	case USER_SIGNIN_FAIL:
		return { loading: false, success: false, error: action.payload };
	case USER_SIGNOUT:
		return {};
	default:
		return state;
	}
};

export const userLoadProfileReducer = (state = {}, action) => {
	switch (action.type) {
	case USER_LOAD_PROFILE_REQUEST:
		return { loading: true };
	case USER_LOAD_PROFILE_SUCCESS:
		return { loading: false, userInfo: action.payload };
	case USER_LOAD_PROFILE_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
	case USER_UPDATE_PROFILE_REQUEST:
		return { loading: true };
	case USER_UPDATE_PROFILE_SUCCESS:
		return { loading: false, success: action.payload };
	case USER_UPDATE_PROFILE_FAIL:
		return { loading: false, error: action.payload };
	case USER_UPDATE_PROFILE_RESET:
		return {};
	default:
		return state;
	}
};

export const changePasswordReducer = (state = {}, action) => {
	switch (action.type) {
	case USER_CHANGE_PASSWORD_REQUEST:
		return { loading: true };
	case USER_CHANGE_PASSWORD_SUCCESS:
		return { loading: false, success: action.payload };
	case USER_CHANGE_PASSWORD_FAIL:
		return { loading: false, error: action.payload };
	case USER_CHANGE_PASSWORD_RESET:
		return {};
	default:
		return state;
	}
};

export const reportBugReducer = (state = {}, action) => {
	switch (action.type) {
	case USER_REPORT_BUG_REQUEST:
		return { loading: true };
	case USER_REPORT_BUG_SUCCESS:
		return { loading: false, success: true, response: action.payload };
	case USER_REPORT_BUG_FAIL:
		return { loading: false, success: false, error: action.payload };
	case USER_REPORT_BUG_RESET:
		return {};
	default:
		return state;
	}
};
