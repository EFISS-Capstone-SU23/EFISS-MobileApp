import {
	PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL,
	PRODUCT_TEXT_SEARCH_REQUEST, PRODUCT_TEXT_SEARCH_SUCCESS, PRODUCT_TEXT_SEARCH_FAIL,
	PRODUCT_GET_BY_ID_REQUEST, PRODUCT_GET_BY_ID_SUCCESS, PRODUCT_GET_BY_ID_FAIL,
	PRODUCT_COLLECTIONS_LOAD_REQUEST, PRODUCT_COLLECTIONS_LOAD_SUCCESS, PRODUCT_COLLECTIONS_LOAD_FAIL,
	PRODUCT_COLLECTIONS_ADD_REQUEST, PRODUCT_COLLECTIONS_ADD_SUCCESS,
	PRODUCT_COLLECTIONS_ADD_FAIL, PRODUCT_COLLECTIONS_ADD_RESET,
	PRODUCT_COLLECTIONS_UPDATE_REQUEST, PRODUCT_COLLECTIONS_UPDATE_SUCCESS,
	PRODUCT_COLLECTIONS_UPDATE_FAIL, PRODUCT_COLLECTIONS_UPDATE_RESET,
	PRODUCT_COLLECTIONS_REMOVE_REQUEST, PRODUCT_COLLECTIONS_REMOVE_SUCCESS,
	PRODUCT_COLLECTIONS_REMOVE_FAIL, PRODUCT_COLLECTIONS_REMOVE_RESET,
	PRODUCT_COLLECTION_DETAILS_LOAD_REQUEST, PRODUCT_COLLECTION_DETAILS_LOAD_SUCCESS,
	PRODUCT_COLLECTION_DETAILS_LOAD_FAIL,
	PRODUCT_COLLECTION_DETAILS_ADD_REQUEST, PRODUCT_COLLECTION_DETAILS_ADD_SUCCESS,
	PRODUCT_COLLECTION_DETAILS_ADD_FAIL, PRODUCT_COLLECTION_DETAILS_ADD_RESET,
	PRODUCT_COLLECTION_DETAILS_REMOVE_REQUEST, PRODUCT_COLLECTION_DETAILS_REMOVE_SUCCESS,
	PRODUCT_COLLECTION_DETAILS_REMOVE_FAIL, PRODUCT_COLLECTION_DETAILS_REMOVE_RESET,
	PRODUCT_HISTORY_LOAD_REQUEST, PRODUCT_HISTORY_LOAD_SUCCESS, PRODUCT_HISTORY_LOAD_FAIL,
	PRODUCT_HISTORY_SET_REQUEST, PRODUCT_HISTORY_SET_SUCCESS, PRODUCT_HISTORY_SET_FAIL,
	PRODUCT_RECOMMEND_LOAD_REQUEST, PRODUCT_RECOMMEND_LOAD_SUCCESS, PRODUCT_RECOMMEND_LOAD_FAIL,
	BANNER_ADS_GET_REQUEST, BANNER_ADS_GET_SUCCESS, BANNER_ADS_GET_FAIL,
	COLLECTION_ADS_GET_REQUEST, COLLECTION_ADS_GET_SUCCESS, COLLECTION_ADS_GET_FAIL,
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

export const getBannerAdsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case BANNER_ADS_GET_REQUEST:
		return { loading: true };
	case BANNER_ADS_GET_SUCCESS:
		return { loading: false, ads: action.payload };
	case BANNER_ADS_GET_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// product search
export const getCollectionAdsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case COLLECTION_ADS_GET_REQUEST:
		return { loading: true };
	case COLLECTION_ADS_GET_SUCCESS:
		return { loading: false, data: action.payload };
	case COLLECTION_ADS_GET_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// product search
export const searchTextProductsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_TEXT_SEARCH_REQUEST:
		return { loading: true };
	case PRODUCT_TEXT_SEARCH_SUCCESS:
		return {
			loading: false, products: action.payload.products, totalPages: action.payload.totalPages,
		};
	case PRODUCT_TEXT_SEARCH_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// product search
export const getProductByIdReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_GET_BY_ID_REQUEST:
		return { loading: true };
	case PRODUCT_GET_BY_ID_SUCCESS:
		return { loading: false, product: action.payload };
	case PRODUCT_GET_BY_ID_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// collections load
export const loadCollectionsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_COLLECTIONS_LOAD_REQUEST:
		return { loading: true };
	case PRODUCT_COLLECTIONS_LOAD_SUCCESS:
		return {
			loading: false, collections: action.payload,
		};
	case PRODUCT_COLLECTIONS_LOAD_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// collections add
export const addCollectionsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_COLLECTIONS_ADD_REQUEST:
		return { loadingAddCollections: true };
	case PRODUCT_COLLECTIONS_ADD_SUCCESS:
		return { loadingAddCollections: false, successAddCollections: action.payload };
	case PRODUCT_COLLECTIONS_ADD_FAIL:
		return { loadingAddCollections: false, errorAddCollections: action.payload };
	case PRODUCT_COLLECTIONS_ADD_RESET:
		return { };
	default:
		return state;
	}
};

// collections add
export const updateCollectionsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_COLLECTIONS_UPDATE_REQUEST:
		return { loadingUpdateCollections: true };
	case PRODUCT_COLLECTIONS_UPDATE_SUCCESS:
		return { loadingUpdateCollections: false, successUpdateCollections: action.payload };
	case PRODUCT_COLLECTIONS_UPDATE_FAIL:
		return { loadingUpdateCollections: false, errorUpdateCollections: action.payload };
	case PRODUCT_COLLECTIONS_UPDATE_RESET:
		return { };
	default:
		return state;
	}
};

// collections remove
export const removeCollectionsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_COLLECTIONS_REMOVE_REQUEST:
		return { loadingRemoveCollections: true };
	case PRODUCT_COLLECTIONS_REMOVE_SUCCESS:
		return { loadingRemoveCollections: false, successRemoveCollections: action.payload };
	case PRODUCT_COLLECTIONS_REMOVE_FAIL:
		return { loadingRemoveCollections: false, errorRemoveCollections: action.payload };
	case PRODUCT_COLLECTIONS_REMOVE_RESET:
		return { };
	default:
		return state;
	}
};

// wishlist load
export const loadCollectionDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_COLLECTION_DETAILS_LOAD_REQUEST:
		return { loading: true };
	case PRODUCT_COLLECTION_DETAILS_LOAD_SUCCESS:
		return {
			loading: false,
			products: action.payload.products.productsList,
			totalPages: action.payload.totalPages,
		};
	case PRODUCT_COLLECTION_DETAILS_LOAD_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};

// wishlist add
export const addCollectionDetailsReducer = (state = { loadingAddWishlist: true }, action) => {
	switch (action.type) {
	case PRODUCT_COLLECTION_DETAILS_ADD_REQUEST:
		return { loadingAddCollectionDetails: true };
	case PRODUCT_COLLECTION_DETAILS_ADD_SUCCESS:
		return { loadingAddCollectionDetails: false, successAddCollectionDetails: action.payload };
	case PRODUCT_COLLECTION_DETAILS_ADD_FAIL:
		return { loadingAddCollectionDetails: false, errorAddCollectionDetails: action.payload };
	case PRODUCT_COLLECTION_DETAILS_ADD_RESET:
		return { };
	default:
		return state;
	}
};

// wishlist remove
export const removeCollectionDetailsReducer = (state = { loadingRemoveWishlist: true }, action) => {
	switch (action.type) {
	case PRODUCT_COLLECTION_DETAILS_REMOVE_REQUEST:
		return { loadingRemoveCollectionDetails: true };
	case PRODUCT_COLLECTION_DETAILS_REMOVE_SUCCESS:
		return {
			loadingRemoveCollectionDetails: false, successRemoveCollectionDetails: action.payload,
		};
	case PRODUCT_COLLECTION_DETAILS_REMOVE_FAIL:
		return { loadingRemoveCollectionDetails: false, errorRemoveCollectionDetails: action.payload };
	case PRODUCT_COLLECTION_DETAILS_REMOVE_RESET:
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

// load product recommendations
export const loadProductRecommendReducer = (state = { loading: true }, action) => {
	switch (action.type) {
	case PRODUCT_RECOMMEND_LOAD_REQUEST:
		return { loading: true };
	case PRODUCT_RECOMMEND_LOAD_SUCCESS:
		return { loading: false, products: action.payload.products };
	case PRODUCT_RECOMMEND_LOAD_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};
