import { combineReducers } from 'redux';

import {
	searchProductsReducer,
	loadWishlistReducer,
	addWishlistReducer,
	removeWishlistReducer,
	setProductHistoryReducer,
	loadProductHistoryReducer,
} from './productReducers';
import {
	userRegisterReducer,
	userSigninReducer,
	userUpdateProfileReducer,
	userLoadProfileReducer,
	changePasswordReducer,
	reportBugReducer,
} from './userReducers';

const reducer = combineReducers({
	searchProducts: searchProductsReducer,
	userRegister: userRegisterReducer,
	userSignin: userSigninReducer,
	loadWishlist: loadWishlistReducer,
	addWishlist: addWishlistReducer,
	removeWishlist: removeWishlistReducer,
	setProductHistory: setProductHistoryReducer,
	loadProductHistory: loadProductHistoryReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userLoadProfile: userLoadProfileReducer,
	changePassword: changePasswordReducer,
	reportBug: reportBugReducer,
});

export default (state, action) => reducer(state, action);
