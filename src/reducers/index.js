import { combineReducers } from 'redux';

import { searchProductsReducer } from './productsReducer';

import { userSigninReducer } from './usersReducer';

const reducer = combineReducers({
	searchProducts: searchProductsReducer,
	userSignin: userSigninReducer,
});

export default (state, action) => reducer(state, action);
