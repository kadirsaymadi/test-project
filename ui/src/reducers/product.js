import {
    GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL,
    SELECT_PRODUCT
} from "../actions/product"; // action types

// default initial state
const INITIAL_STATE = {
    products: [],
    selectedProduct: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
            };
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.data.response.products
            };
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: []
            };
        case SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload.selectedProduct,
            };
        default:
            return { ...state };
    }
};