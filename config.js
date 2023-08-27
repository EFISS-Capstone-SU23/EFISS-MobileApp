import AsyncStorage from '@react-native-async-storage/async-storage';

export const configKeys = {
	BE_BASE_API: 'BE_BASE_API',
	IS_LOCAL: 'IS_LOCAL',
	IMG_STORAGE_URL: 'IMG_STORAGE_URL',
};

export const config = {
	BE_BASE_API: 'https://dev.efiss.tech',
	IMG_STORAGE_URL: '',
	IS_LOCAL: false,

	SELECT_FROM_BOTH: 'both',
	SELECT_FROM_BRAND: 'brand',
	SELECT_FROM_MARKETPLACE: 'marketplace',

	SEARCH_ROUTER: 'search/image',
	TEXT_SEARCH_ROUTER: 'search/text?q=:query&pageSize=:pageSize&pageNumber=:pageNum&sortBy=:sortBy',

	BANNER_ADS_ROUTER: 'ads/banner',
	COLLECTIONS_ADD_ROUTER: 'ads/collection',

	SIGNUP_ROUTER: 'auth/sign-up',
	SIGNIN_ROUTER: 'auth/sign-in',
	CHANGE_PASSWORD_ROUTER: 'auth/change-password',
	SEND_RESET_PASSWORD: 'auth/reset-password',
	REFRESH_TOKEN_ROUTER: 'auth/refresh-token',

	GET_BY_ID_ROUTER: 'product',
	RECOMMEND_PRODUCT_ROUTER: 'product/recommend',
	COLLECTIONS_ROUTER: 'normal-user/collections',
	COLLECTION_DETAILS_PAGINATION_ROUTER: 'normal-user/collections/:id/products?pageSize=:pageSize&pageNumber=:pageNum',
	COLLECTION_DETAILS_ROUTER: 'normal-user/collections/:id/products',
	COLLECTIONS_DETAILS_REMOVE_ROUTER: 'normal-user/collections/:collectionId/products/:productId',
	PROFILE_ROUTER: 'normal-user/profile',
	REPORT_BUG: 'normal-user/bug-report',
	VERIFY_EMAIL_ROUTER: 'auth/verify-email/resend',

	LOAD_MORE_BY_URL: 'product/list/by-image-urls',

	PAGE_SIZE: 20,
	DIVERSITY: 1,
	SORT_BY_RELEVANCE: 'relevance',
	SORT_BY_PRICE_ASC: 'price_asc',
	SORT_BY_PRICE_DESC: 'price_desc',
	SORT_BY_DEFAULT: 'default',
};

export const updateBaseApi = async (newApi) => {
	try {
		config.BE_BASE_API = newApi;
		await AsyncStorage.setItem(configKeys.BE_BASE_API, newApi);
	} catch (error) {
		console.error('Error saving data:', error);
	}
};

export const updateLocalStatus = async (newStatus) => {
	try {
		config.IS_LOCAL = newStatus;
		await AsyncStorage.setItem(configKeys.IS_LOCAL, newStatus.toString());
	} catch (error) {
		console.error('Error updating and storing local status:', error);
	}
};

export const updateImgUrl = async (newImgUrl) => {
	try {
		config.IMG_STORAGE_URL = newImgUrl;
		await AsyncStorage.setItem(configKeys.IMG_STORAGE_URL, newImgUrl);
	} catch (error) {
		console.error('Error saving data:', error);
	}
};

export const updatePageSize = (newSize) => {
	config.PAGE_SIZE = newSize;
};

export const updateDiversity = (newDiversity) => {
	config.DIVERSITY = newDiversity;
};

// Load config from AsyncStorage when app starts
export const loadConfigFromStorage = async () => {
	try {
		const storedApi = await AsyncStorage.getItem(configKeys.BE_BASE_API);
		const storedLocalStatus = await AsyncStorage.getItem(configKeys.IS_LOCAL);
		const storedImgUrl = await AsyncStorage.getItem(configKeys.IMG_STORAGE_URL);

		if (storedApi !== null) {
			config.BE_BASE_API = storedApi;
		}

		if (storedLocalStatus !== null) {
			config.IS_LOCAL = JSON.parse(storedLocalStatus);
		}

		if (storedImgUrl !== null) {
			config.IMG_STORAGE_URL = storedImgUrl;
		}
	} catch (error) {
		console.error('Error loading config from storage:', error);
	}
};
