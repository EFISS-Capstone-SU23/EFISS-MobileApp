import { combineReducers } from 'redux';

import {
	searchProductsReducer,
	loadWishlistReducer,
	setProductHistoryReducer,
	loadProductHistoryReducer,
} from './productReducers';
import { userRegisterReducer } from './userReducers';

const reducer = combineReducers({
	searchProducts: searchProductsReducer,
	userRegister: userRegisterReducer,
	loadWishlist: loadWishlistReducer,
	setProductHistory: setProductHistoryReducer,
	loadProductHistory: loadProductHistoryReducer,
});

export default (state, action) => reducer(state, action);
