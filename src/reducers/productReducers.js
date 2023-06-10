import {
	PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL,
	PRODUCT_WISHLIST_LOAD_REQUEST, PRODUCT_WISHLIST_LOAD_SUCCESS, PRODUCT_WISHLIST_LOAD_FAIL,
	PRODUCT_HISTORY_LOAD_REQUEST, PRODUCT_HISTORY_LOAD_SUCCESS, PRODUCT_HISTORY_LOAD_FAIL,
	PRODUCT_HISTORY_SET_REQUEST, PRODUCT_HISTORY_SET_SUCCESS, PRODUCT_HISTORY_SET_FAIL,
	PRODUCT_WISHLIST_ADD_REQUEST, PRODUCT_WISHLIST_ADD_SUCCESS,
	PRODUCT_WISHLIST_ADD_FAIL, PRODUCT_WISHLIST_ADD_RESET,
	PRODUCT_WISHLIST_REMOVE_REQUEST, PRODUCT_WISHLIST_REMOVE_SUCCESS,
	PRODUCT_WISHLIST_REMOVE_FAIL, PRODUCT_WISHLIST_REMOVE_RESET,
} from '../constants/productConstants';

// product search
export const searchProductsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_SEARCH_REQUEST:
		return { loading: true };
	case PRODUCT_SEARCH_SUCCESS:
		return { loading: false, products: action.payload };
	case PRODUCT_SEARCH_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// wishlist load
export const loadWishlistReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_WISHLIST_LOAD_REQUEST:
		return { loading: true };
	case PRODUCT_WISHLIST_LOAD_SUCCESS:
		return {
			loading: false, products: action.payload.products, totalPages: action.payload.totalPages,
		};
	case PRODUCT_WISHLIST_LOAD_FAIL:
		console.log('error');
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// wishlist add
export const addWishlistReducer = (state = { loadingAddWishlist: true }, action) => {
	switch (action.type) {
	case PRODUCT_WISHLIST_ADD_REQUEST:
		return { loadingAddWishlist: true };
	case PRODUCT_WISHLIST_ADD_SUCCESS:
		return { loadingAddWishlist: false, successAddWishlist: action.payload };
	case PRODUCT_WISHLIST_ADD_FAIL:
		return { loadingAddWishlist: false, errorAddWishlist: action.payload };
	case PRODUCT_WISHLIST_ADD_RESET:
		return { };
	default:
		return state;
	}
};

// wishlist remove
export const removeWishlistReducer = (state = { loadingRemoveWishlist: true }, action) => {
	switch (action.type) {
	case PRODUCT_WISHLIST_REMOVE_REQUEST:
		return { loadingRemoveWishlist: true };
	case PRODUCT_WISHLIST_REMOVE_SUCCESS:
		return { loadingRemoveWishlist: false, successRemoveWishlist: action.payload };
	case PRODUCT_WISHLIST_REMOVE_FAIL:
		return { loadingRemoveWishlist: false, errorRemoveWishlist: action.payload };
	case PRODUCT_WISHLIST_REMOVE_RESET:
		return { };
	default:
		return state;
	}
};

// load product history
export const loadProductHistoryReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_HISTORY_LOAD_REQUEST:
		return { loading: true };
	case PRODUCT_HISTORY_LOAD_SUCCESS:
		return { loading: false, products: action.payload };
	case PRODUCT_HISTORY_LOAD_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// set product history
export const setProductHistoryReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_HISTORY_SET_REQUEST:
		return { loading: true };
	case PRODUCT_HISTORY_SET_SUCCESS:
		return { loading: false, products: action.payload };
	case PRODUCT_HISTORY_SET_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};
