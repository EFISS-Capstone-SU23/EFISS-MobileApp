import { combineReducers } from 'redux';

import { searchProductsReducer } from './productReducers';
import { userRegisterReducer } from './userReducers';

const reducer = combineReducers({
	searchProducts: searchProductsReducer,
	userRegister: userRegisterReducer,
});

export default (state, action) => reducer(state, action);
