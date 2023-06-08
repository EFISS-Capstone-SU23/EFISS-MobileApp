import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL,
	PRODUCT_WISHLIST_LOAD_REQUEST, PRODUCT_WISHLIST_LOAD_SUCCESS, PRODUCT_WISHLIST_LOAD_FAIL,
	PRODUCT_HISTORY_SET_REQUEST, PRODUCT_HISTORY_SET_SUCCESS, PRODUCT_HISTORY_SET_FAIL,
	PRODUCT_HISTORY_LOAD_REQUEST, PRODUCT_HISTORY_LOAD_SUCCESS, PRODUCT_HISTORY_LOAD_FAIL,
	PRODUCT_WISHLIST_ADD_REQUEST, PRODUCT_WISHLIST_ADD_SUCCESS, PRODUCT_WISHLIST_ADD_FAIL,
	PRODUCT_WISHLIST_REMOVE_REQUEST, PRODUCT_WISHLIST_REMOVE_SUCCESS, PRODUCT_WISHLIST_REMOVE_FAIL,
} from '../constants/productConstants';
import { config } from '../../config';

export const productsSearch = (imageURL) => async (dispatch) => {
	dispatch({ type: PRODUCT_SEARCH_REQUEST, payload: imageURL });
	try {
		const { data } = await axios.post(
			`${config.BE_BASE_API}/${config.SEARCH_ROUTER}`,
			{
				encodedImage: imageURL,
				limit: 10,
				sortBy: 'relevance',
				category: 'all',
			},
		);
		dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
	} catch (error) {
		console.log('productsSearch error: ', error);
		dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error });
	}
};

export const wishlistLoad = (userToken) => async (dispatch) => {
	dispatch({ type: PRODUCT_WISHLIST_LOAD_REQUEST });
	try {
		const { data } = await axios.get(`${config.BE_BASE_API}/${config.WISHLIST_ROUTER}`, {
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		});
		dispatch({ type: PRODUCT_WISHLIST_LOAD_SUCCESS, payload: data.products });
	} catch (error) {
		console.log('wishlistLoad error: ', error);
		dispatch({ type: PRODUCT_WISHLIST_LOAD_FAIL, payload: error });
	}
};

export const wishlistAdd = (userToken, id) => async (dispatch) => {
	dispatch({ type: PRODUCT_WISHLIST_ADD_REQUEST, payload: id });
	try {
		const { data } = await axios.post(
			`${config.BE_BASE_API}/${config.WISHLIST_ROUTER}`,
			{
				productId: id,
			},
			{
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			},
		);
		dispatch({ type: PRODUCT_WISHLIST_ADD_SUCCESS, payload: data });
	} catch (error) {
		console.log('wishlistAdd error: ', error);
		dispatch({ type: PRODUCT_WISHLIST_ADD_FAIL, payload: error });
	}
};

export const wishlistRemove = (userToken, id) => async (dispatch) => {
	dispatch({ type: PRODUCT_WISHLIST_REMOVE_REQUEST, payload: id });
	try {
		const { data } = await axios.delete(
			`${config.BE_BASE_API}/${config.WISHLIST_ROUTER}`,
			{
				data: {
					productId: id,
				},
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			},
		);
		dispatch({ type: PRODUCT_WISHLIST_REMOVE_SUCCESS, payload: data });
	} catch (error) {
		console.log('wishlistRemove error: ', error);
		dispatch({ type: PRODUCT_WISHLIST_REMOVE_FAIL, payload: error });
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
