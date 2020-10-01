export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";

export const SELECT_PRODUCT = "SELECT_PRODUCT";

// login action
export const getProducts = (user) => {
    return {
        type: "GET_PRODUCTS", // action type
        payload: {
            request: { // requiest data
                url: '/get-product-list',
                method: 'GET',
            }
        }
    }
}