import { combineReducers } from "redux";

import { searchProductsReducer } from "./productsReducer";

const reducer = combineReducers({
    searchProducts: searchProductsReducer
})

export default (state, action) => reducer(state, action);