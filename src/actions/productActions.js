import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL,
	PRODUCT_WISHLIST_LOAD_REQUEST, PRODUCT_WISHLIST_LOAD_SUCCESS, PRODUCT_WISHLIST_LOAD_FAIL,
	PRODUCT_HISTORY_SET_REQUEST, PRODUCT_HISTORY_SET_SUCCESS, PRODUCT_HISTORY_SET_FAIL,
	PRODUCT_HISTORY_LOAD_REQUEST, PRODUCT_HISTORY_LOAD_SUCCESS, PRODUCT_HISTORY_LOAD_FAIL,
} from '../constants/productConstants';
import { config } from '../../config';

export const productsSearch = (imageURL) => async (dispatch) => {
	dispatch({ type: PRODUCT_SEARCH_REQUEST, payload: imageURL });
	try {
		const { data } = await axios.post(`${config.BE_BASE_API}/${config.SEARCH_ROUTER}`, { encodedImage: imageURL });
		dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error });
	}
};

export const wishlistLoad = () => async (dispatch) => {
	dispatch({ type: PRODUCT_WISHLIST_LOAD_REQUEST });
	try {
		const value = await AsyncStorage.getItem('product_history');
		if (value !== null) {
			const productHistory = JSON.parse(value);
			dispatch({ type: PRODUCT_WISHLIST_LOAD_SUCCESS, payload: productHistory.reverse() });
		} else {
			dispatch({ type: PRODUCT_WISHLIST_LOAD_SUCCESS, payload: [] });
		}
	} catch (error) {
		dispatch({ type: PRODUCT_WISHLIST_LOAD_FAIL, payload: error });
	}
};

export const productHistoryLoad = () => async (dispatch) => {
	dispatch({ type: PRODUCT_HISTORY_LOAD_REQUEST });
	try {
		const value = await AsyncStorage.getItem('product_history');
		if (value !== null) {
			const productHistory = JSON.parse(value);
			dispatch({ type: PRODUCT_HISTORY_LOAD_SUCCESS, payload: productHistory.reverse() });
		} else {
			dispatch({ type: PRODUCT_HISTORY_LOAD_SUCCESS, payload: [] });
		}
	} catch (error) {
		dispatch({ type: PRODUCT_HISTORY_LOAD_FAIL, payload: error });
	}
};

export const productHistorySet = (productParam) => async (dispatch) => {
	dispatch({ type: PRODUCT_HISTORY_SET_REQUEST, payload: productParam });
	try {
		const value = await AsyncStorage.getItem('product_history');
		if (value !== null) {
			const productHistory = JSON.parse(value)
				.filter((obj) => obj._id !== productParam._id)
				.concat([productParam]);

			if (productHistory.length > 50) productHistory.shift();

			await AsyncStorage.setItem('product_history', JSON.stringify(productHistory));
		} else {
			const productHistory = [productParam];
			await AsyncStorage.setItem('product_history', JSON.stringify(productHistory));
		}
		dispatch({ type: PRODUCT_HISTORY_SET_SUCCESS, payload: productParam });
	} catch (error) {
		dispatch({ type: PRODUCT_HISTORY_SET_FAIL, payload: error });
	}
};
