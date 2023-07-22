import { combineReducers } from 'redux';

import {
	searchProductsReducer,
	loadWishlistReducer,
	addWishlistReducer,
	removeWishlistReducer,
	setProductHistoryReducer,
	loadProductHistoryReducer,
	loadCollectionsReducer,
	addCollectionsReducer,
	updateCollectionsReducer,
	removeCollectionsReducer,
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
	loadCollections: loadCollectionsReducer,
	addCollections: addCollectionsReducer,
	updateCollections: updateCollectionsReducer,
	removeCollections: removeCollectionsReducer,
});

export default (state, action) => reducer(state, action);
