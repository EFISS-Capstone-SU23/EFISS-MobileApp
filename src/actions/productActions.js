import {
    PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL
} from '../constants/productConstants'
import axios from "axios";
import { config } from "../../config";

export const productsSearch = (imageURL) => async (dispatch) => {
    dispatch({ type: PRODUCT_SEARCH_REQUEST, payload: imageURL });
    try {
        const { data } = await axios.post(`${config.BE_BASE_API}/${config.SEARCH_ROUTER}`, { encodedImage: imageURL });
        dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error });
    }
};