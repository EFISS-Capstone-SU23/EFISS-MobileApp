import { combineReducers } from 'redux';

import {
	searchProductsReducer,
	searchTextProductsReducer,
	getProductByIdReducer,
	setProductHistoryReducer,
	loadProductHistoryReducer,
	loadCollectionsReducer,
	addCollectionsReducer,
	updateCollectionsReducer,
	removeCollectionsReducer,
	loadCollectionDetailsReducer,
	addCollectionDetailsReducer,
	removeCollectionDetailsReducer,
	loadProductRecommendReducer,
} from './productReducers';
import {
	userRegisterReducer,
	userSigninReducer,
	userUpdateProfileReducer,
	userLoadProfileReducer,
	changePasswordReducer,
	reportBugReducer,
	sendResetPasswordReducer,
	verifyEmailReducer,
} from './userReducers';

const reducer = combineReducers({
	searchProducts: searchProductsReducer,
	searchTextProducts: searchTextProductsReducer,
	getProductById: getProductByIdReducer,
	userRegister: userRegisterReducer,
	userSignin: userSigninReducer,
	loadCollectionDetails: loadCollectionDetailsReducer,
	addCollectionDetails: addCollectionDetailsReducer,
	removeCollectionDetails: removeCollectionDetailsReducer,
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
	loadProductRecommend: loadProductRecommendReducer,
	sendResetPassword: sendResetPasswordReducer,
	verifyEmail: verifyEmailReducer,
});

export default (state, action) => reducer(state, action);
