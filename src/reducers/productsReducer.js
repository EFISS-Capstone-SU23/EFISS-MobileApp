import {
	PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL,
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
