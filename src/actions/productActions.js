import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL,
	PRODUCT_TEXT_SEARCH_REQUEST, PRODUCT_TEXT_SEARCH_SUCCESS, PRODUCT_TEXT_SEARCH_FAIL,
	PRODUCT_GET_BY_ID_REQUEST, PRODUCT_GET_BY_ID_SUCCESS, PRODUCT_GET_BY_ID_FAIL,
	PRODUCT_COLLECTIONS_LOAD_REQUEST, PRODUCT_COLLECTIONS_LOAD_SUCCESS, PRODUCT_COLLECTIONS_LOAD_FAIL,
	PRODUCT_COLLECTIONS_ADD_REQUEST, PRODUCT_COLLECTIONS_ADD_SUCCESS, PRODUCT_COLLECTIONS_ADD_FAIL,
	PRODUCT_COLLECTIONS_REMOVE_REQUEST, PRODUCT_COLLECTIONS_REMOVE_SUCCESS,
	PRODUCT_COLLECTIONS_REMOVE_FAIL,
	PRODUCT_COLLECTIONS_UPDATE_REQUEST, PRODUCT_COLLECTIONS_UPDATE_SUCCESS,
	PRODUCT_COLLECTIONS_UPDATE_FAIL,
	PRODUCT_COLLECTION_DETAILS_LOAD_REQUEST, PRODUCT_COLLECTION_DETAILS_LOAD_SUCCESS,
	PRODUCT_COLLECTION_DETAILS_LOAD_FAIL,
	PRODUCT_COLLECTION_DETAILS_ADD_REQUEST, PRODUCT_COLLECTION_DETAILS_ADD_SUCCESS,
	PRODUCT_COLLECTION_DETAILS_ADD_FAIL,
	PRODUCT_COLLECTION_DETAILS_REMOVE_REQUEST, PRODUCT_COLLECTION_DETAILS_REMOVE_SUCCESS,
	PRODUCT_COLLECTION_DETAILS_REMOVE_FAIL,
	PRODUCT_HISTORY_SET_REQUEST, PRODUCT_HISTORY_SET_SUCCESS, PRODUCT_HISTORY_SET_FAIL,
	PRODUCT_HISTORY_LOAD_REQUEST, PRODUCT_HISTORY_LOAD_SUCCESS, PRODUCT_HISTORY_LOAD_FAIL,
	PRODUCT_RECOMMEND_LOAD_REQUEST, PRODUCT_RECOMMEND_LOAD_SUCCESS, PRODUCT_RECOMMEND_LOAD_FAIL,
	BANNER_ADS_GET_REQUEST, BANNER_ADS_GET_SUCCESS, BANNER_ADS_GET_FAIL,
	COLLECTION_ADS_GET_REQUEST, COLLECTION_ADS_GET_SUCCESS, COLLECTION_ADS_GET_FAIL,
} from '../constants/productConstants';
import { config } from '../../config';
import { isTokenStillValid, showSessionExpiredAlert } from '../utils/utils';

// eslint-disable-next-line max-len
export const productsSearch = (imageURL, _limit, _sortBy, _shopType, _category, _minPrice, _maxPrice) => async (dispatch) => {
	dispatch({ type: PRODUCT_SEARCH_REQUEST, payload: imageURL });
	try {
		const startTime = new Date(); // Capture the start time
		console.log({
			limit: _limit,
			sortBy: _sortBy,
			...(_shopType !== 'both' && { shopType: _shopType }),
			...(_minPrice !== null && { minPrice: parseFloat(_minPrice) }),
			...(_maxPrice !== null && { maxPrice: parseFloat(_maxPrice) }),
			diversity: config.DIVERSITY,
		});
		const { data } = await axios.post(
			`${config.BE_BASE_API}/${config.SEARCH_ROUTER}`,
			{
				encodedImage: imageURL,
				limit: _limit,
				sortBy: _sortBy,
				...(_shopType !== 'both' && { shopType: _shopType }),
				...(_minPrice !== null && { minPrice: parseFloat(_minPrice) }),
				...(_maxPrice !== null && { maxPrice: parseFloat(_maxPrice) }),
				diversity: config.DIVERSITY,
			},
		);
		dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
		const endTime = new Date(); // Capture the end time
		const elapsedTime = endTime - startTime; // Calculate the time difference in milliseconds
		console.log('Time taken:', elapsedTime, 'ms');
	} catch (error) {
		console.log('productsSearch error: ', error);
		dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error });
	}
};

// eslint-disable-next-line max-len
export const bannerAdsGet = () => async (dispatch) => {
	dispatch({ type: BANNER_ADS_GET_REQUEST });
	try {
		const { data } = await axios.get(
			`${config.BE_BASE_API}/${config.BANNER_ADS_ROUTER}`,
		);
		dispatch({ type: BANNER_ADS_GET_SUCCESS, payload: data.ads });
	} catch (error) {
		console.log('bannerAdsGet error: ', error);
		dispatch({ type: BANNER_ADS_GET_FAIL, payload: error });
	}
};

export const collectionAdsGet = () => async (dispatch) => {
	dispatch({ type: COLLECTION_ADS_GET_REQUEST });
	try {
		const { data } = await axios.get(
			`${config.BE_BASE_API}/${config.COLLECTIONS_ADD_ROUTER}`,
		);
		dispatch({ type: COLLECTION_ADS_GET_SUCCESS, payload: data.ads });
		console.log(data.ads.collectionAds);
	} catch (error) {
		console.log('collectionAdsGet error: ', error);
		dispatch({ type: COLLECTION_ADS_GET_FAIL, payload: error });
	}
};

// eslint-disable-next-line max-len
export const productsTextSearch = (_query, _pageNum, _sortBy, _shopType, _minPrice, _maxPrice) => async (dispatch) => {
	dispatch({ type: PRODUCT_TEXT_SEARCH_REQUEST, payload: _query });
	const startTime = new Date(); // Capture the start time
	try {
		let updatedRouter = config.TEXT_SEARCH_ROUTER
			.replace(/:query/g, _query)
			.replace(/:pageSize/g, config.PAGE_SIZE)
			.replace(/:pageNum/g, _pageNum)
			.replace(/:sortBy/g, _sortBy);

		if (_minPrice !== null && _minPrice !== undefined) {
			updatedRouter += `&minPrice=${_minPrice}`;
		}

		if (_maxPrice !== null && _maxPrice !== undefined) {
			updatedRouter += `&maxPrice=${_maxPrice}`;
		}

		if (_shopType !== null && _shopType !== 'both') {
			updatedRouter += `&shopType=${_shopType}`;
		}

		const { data } = await axios.get(`${config.BE_BASE_API}/${updatedRouter}`);
		dispatch({ type: PRODUCT_TEXT_SEARCH_SUCCESS, payload: data });

		const endTime = new Date(); // Capture the end time
		const elapsedTime = endTime - startTime; // Calculate the time difference in milliseconds
		console.log('Time taken:', elapsedTime, 'ms');
	} catch (error) {
		console.log('productsTextSearch error: ', error);
		dispatch({ type: PRODUCT_TEXT_SEARCH_FAIL, payload: error });
	}
};

export const productGetById = (_productId) => async (dispatch) => {
	dispatch({ type: PRODUCT_GET_BY_ID_REQUEST });
	try {
		// Check if the product is in the product_history array
		const productHistoryJSON = await AsyncStorage.getItem('product_history');

		if (productHistoryJSON) {
			const productHistory = JSON.parse(productHistoryJSON);
			const storedProduct = productHistory.find((product) => product._id === _productId);

			if (storedProduct) {
				// Use the stored product data
				dispatch({ type: PRODUCT_GET_BY_ID_SUCCESS, payload: storedProduct });
				return;
			}
		}

		// Fetch the product from the API
		const { data } = await axios.get(`${config.BE_BASE_API}/${config.GET_BY_ID_ROUTER}/${_productId}`);
		dispatch({ type: PRODUCT_GET_BY_ID_SUCCESS, payload: data.product });
	} catch (error) {
		console.log('productGetById error: ', error);
		dispatch({ type: PRODUCT_GET_BY_ID_FAIL, payload: error });
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

export const collectionDetailsLoad = (_collectionId, _pageNum) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');
		dispatch({ type: PRODUCT_COLLECTION_DETAILS_LOAD_REQUEST });
		try {
			const updatedRouter = config.COLLECTION_DETAILS_PAGINATION_ROUTER
				.replace(/:id/g, _collectionId)
				.replace(/:pageSize/g, 10)
				.replace(/:pageNum/g, _pageNum);
			const { data } = await axios.get(`${config.BE_BASE_API}/${updatedRouter}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_LOAD_SUCCESS, payload: data });
		} catch (error) {
			console.log('wishlistLoad error: ', error);
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_LOAD_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const collectionDetailsAdd = (_collectionId, _productId) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');

		dispatch({ type: PRODUCT_COLLECTION_DETAILS_ADD_REQUEST, payload: _collectionId });
		try {
			const updatedRouter = config.COLLECTION_DETAILS_ROUTER
				.replace(/:id/g, _collectionId);

			const { data } = await axios.post(
				`${config.BE_BASE_API}/${updatedRouter}`,
				{
					productId: _productId,
				},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_ADD_SUCCESS, payload: data });
		} catch (error) {
			console.log('wishlistAdd error: ', error.toString());
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_ADD_FAIL, payload: error });
		}
	} else {
		showSessionExpiredAlert(dispatch);
	}
};

export const collectionDetailsRemove = (_collectionId, _productId) => async (dispatch) => {
	const tokenIsValid = await isTokenStillValid();
	if (tokenIsValid) {
		const userToken = await AsyncStorage.getItem('userToken');
		dispatch({ type: PRODUCT_COLLECTION_DETAILS_REMOVE_REQUEST });
		try {
			const updatedRouter = config.COLLECTIONS_DETAILS_REMOVE_ROUTER
				.replace(/:collectionId/g, _collectionId)
				.replace(/:productId/g, _productId);

			const { data } = await axios.delete(
				`${config.BE_BASE_API}/${updatedRouter}`,
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				},
			);
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_REMOVE_SUCCESS, payload: data });
		} catch (error) {
			console.log('wishlistRemove error: ', error);
			dispatch({ type: PRODUCT_COLLECTION_DETAILS_REMOVE_FAIL, payload: error });
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

export const productRecommendLoad = () => async (dispatch) => {
	dispatch({ type: PRODUCT_RECOMMEND_LOAD_REQUEST });
	try {
		const value = await AsyncStorage.getItem('product_history');
		if (value !== null) {
			const productHistory = JSON.parse(value);
			const simplifiedDataList = productHistory.map((item) => ({
				productId: item._id,
				categories: item.categories || [],
				shopName: item.shopName,
			}));
			const { data } = await axios.post(
				`${config.BE_BASE_API}/${config.RECOMMEND_PRODUCT_ROUTER}`,
				{
					searchHistories: simplifiedDataList,
				},
			);
			dispatch({ type: PRODUCT_RECOMMEND_LOAD_SUCCESS, payload: data });
		} else {
			dispatch({ type: PRODUCT_RECOMMEND_LOAD_FAIL, payload: { message: 'EFISS have no recommend yet' } });
		}
	} catch (error) {
		console.log('productRecommendLoad error: ', error);
		dispatch({ type: PRODUCT_RECOMMEND_LOAD_FAIL, payload: error });
	}
};
