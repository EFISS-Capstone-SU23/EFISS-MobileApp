import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL,
	PRODUCT_COLLECTIONS_LOAD_REQUEST, PRODUCT_COLLECTIONS_LOAD_SUCCESS, PRODUCT_COLLECTIONS_LOAD_FAIL,
	PRODUCT_COLLECTIONS_ADD_REQUEST, PRODUCT_COLLECTIONS_ADD_SUCCESS, PRODUCT_COLLECTIONS_ADD_FAIL,
	PRODUCT_COLLECTIONS_REMOVE_REQUEST, PRODUCT_COLLECTIONS_REMOVE_SUCCESS,
	PRODUCT_COLLECTIONS_REMOVE_FAIL,
	PRODUCT_COLLECTIONS_UPDATE_REQUEST, PRODUCT_COLLECTIONS_UPDATE_SUCCESS,
	PRODUCT_COLLECTIONS_UPDATE_FAIL,
	PRODUCT_WISHLIST_LOAD_REQUEST, PRODUCT_WISHLIST_LOAD_SUCCESS, PRODUCT_WISHLIST_LOAD_FAIL,
	PRODUCT_WISHLIST_ADD_REQUEST, PRODUCT_WISHLIST_ADD_SUCCESS, PRODUCT_WISHLIST_ADD_FAIL,
	PRODUCT_WISHLIST_REMOVE_REQUEST, PRODUCT_WISHLIST_REMOVE_SUCCESS, PRODUCT_WISHLIST_REMOVE_FAIL,
	PRODUCT_HISTORY_SET_REQUEST, PRODUCT_HISTORY_SET_SUCCESS, PRODUCT_HISTORY_SET_FAIL,
	PRODUCT_HISTORY_LOAD_REQUEST, PRODUCT_HISTORY_LOAD_SUCCESS, PRODUCT_HISTORY_LOAD_FAIL,
} from '../constants/productConstants';
import { config } from '../../config';
import { isTokenStillValid, showSessionExpiredAlert } from '../utils/utils';

export const productsSearch = (imageURL, _limit, _sortBy, _category) => async (dispatch) => {
	console.log('Searching image');
	dispatch({ type: PRODUCT_SEARCH_REQUEST, payload: imageURL });
	try {
		const { data } = await axios.post(
			`${config.BE_BASE_API}/${config.SEARCH_ROUTER}`,
			{
				encodedImage: imageURL,
				limit: _limit,
				sortBy: _sortBy,
				category: _category,
			},
		);
		dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
	} catch (error) {
		console.log('productsSearch error: ', error);
		dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error });
	}
};

export const collectionsLoad = () => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');
		dispatch({ type: PRODUCT_COLLECTIONS_LOAD_REQUEST });
		try {
			const { data } = await axios.get(`${config.BE_BASE_API}/${config.COLLECTIONS_ROUTER}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			dispatch({ type: PRODUCT_COLLECTIONS_LOAD_SUCCESS, payload: data.collections });
		} catch (error) {
			console.log('collectionsLoad error: ', error);
			dispatch({ type: PRODUCT_COLLECTIONS_LOAD_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const collectionsAdd = (_collectionName) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');
		dispatch({ type: PRODUCT_COLLECTIONS_ADD_REQUEST });
		try {
			const { data } = await axios.post(
				`${config.BE_BASE_API}/${config.COLLECTIONS_ROUTER}`,
				{
					collectionName: _collectionName,
				},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: PRODUCT_COLLECTIONS_ADD_SUCCESS, payload: data });
		} catch (error) {
			console.log('collectionsLoad error: ', error);
			dispatch({ type: PRODUCT_COLLECTIONS_ADD_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const collectionsUpdate = (_collectionName, _collectionId) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');
		dispatch({ type: PRODUCT_COLLECTIONS_UPDATE_REQUEST });
		try {
			const { data } = await axios.put(
				`${config.BE_BASE_API}/${config.COLLECTIONS_ROUTER}/${_collectionId}`,
				{
					name: _collectionName,
				},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: PRODUCT_COLLECTIONS_UPDATE_SUCCESS, payload: data });
		} catch (error) {
			console.log('collectionsLoad error: ', error);
			dispatch({ type: PRODUCT_COLLECTIONS_UPDATE_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const collectionsRemove = (_collectionId) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');
		dispatch({ type: PRODUCT_COLLECTIONS_REMOVE_REQUEST });
		try {
			const { data } = await axios.delete(
				`${config.BE_BASE_API}/${config.COLLECTIONS_ROUTER}/${_collectionId}`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: PRODUCT_COLLECTIONS_REMOVE_SUCCESS, payload: data });
		} catch (error) {
			console.log('collectionsLoad error: ', error);
			dispatch({ type: PRODUCT_COLLECTIONS_REMOVE_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const wishlistLoad = (pageNum) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: PRODUCT_WISHLIST_LOAD_REQUEST });

		try {
			const { data } = await axios.get(`${config.BE_BASE_API}/${config.COLLECTION_DETAILS_ROUTER}?pageSize=8&pageNumber=${pageNum}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			dispatch({ type: PRODUCT_WISHLIST_LOAD_SUCCESS, payload: data });
		} catch (error) {
			console.log('wishlistLoad error: ', error);
			dispatch({ type: PRODUCT_WISHLIST_LOAD_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const wishlistAdd = (id) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: PRODUCT_WISHLIST_ADD_REQUEST, payload: id });
		try {
			const { data } = await axios.post(
				`${config.BE_BASE_API}/${config.COLLECTION_DETAILS_ROUTER}`,
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
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const wishlistRemove = (id) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');
		dispatch({ type: PRODUCT_WISHLIST_REMOVE_REQUEST, payload: id });
		try {
			const { data } = await axios.delete(
				`${config.BE_BASE_API}/${config.COLLECTION_DETAILS_ROUTER}`,
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
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const productHistoryLoad = () => async (dispatch) => {
	dispatch({ type: PRODUCT_HISTORY_LOAD_REQUEST });
	try {
		const value = await AsyncStorage.getItem('product_history');
		if (value !== null) {
			const productHistory = JSON.parse(value);
			dispatch({
				type: PRODUCT_HISTORY_LOAD_SUCCESS,
				payload: productHistory.reverse().slice(0, 10),
			});
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
