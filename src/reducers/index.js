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
	userUpdateProfileReducer,
	userLoadProfileReducer,
	changePasswordReducer,
} from './userReducers';

const reducer = combineReducers({
	searchProducts: searchProductsReducer,
	userRegister: userRegisterReducer,
	loadWishlist: loadWishlistReducer,
	addWishlist: addWishlistReducer,
	removeWishlist: removeWishlistReducer,
	setProductHistory: setProductHistoryReducer,
	loadProductHistory: loadProductHistoryReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userLoadProfile: userLoadProfileReducer,
	changePassword: changePasswordReducer,
});

export default (state, action) => reducer(state, action);
