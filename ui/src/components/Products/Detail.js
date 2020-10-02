import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { SELECT_PRODUCT, SET_SHOPPING_PRODUCT } from '../../actions/product';

const Detail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    // get store in products
    let { selectedProduct, shopping } = useSelector(rootReducer => rootReducer.productReducer);

    // check has a selected product
    if (!selectedProduct) {
        history.push("/");
    }

    const handleClearSelectedProduct = async () => {
        // on loading clear local storage
        dispatch({
            type: SELECT_PRODUCT,
            payload: {
                selectedProduct: null
            }
        })
        // send detail page
        history.push("/detail");
    }

    const handleAddShoppingBasket = async (product) => {

        let index = shopping.basket.findIndex(item => item.id.toString() === product.id.toString());
        console.log(shopping)
        if (index > -1) {
            shopping.basket[index].quantity += 1;
            shopping.total += parseFloat(product.price);
            dispatch({
                type: SET_SHOPPING_PRODUCT,
                payload: {
                    shopping
                }
            })
        }
        else {
            shopping.basket.push({
                id: product.id,
                name: product.productName,
                quantity: 1,
                img: product.image,
                price: parseFloat(product.price),
            });
            shopping.total += parseFloat(product.price);

            // set selected product in redux
            dispatch({
                type: SET_SHOPPING_PRODUCT,
                payload: {
                    shopping
                }
            })
        }
    }

    return (
        <figure className="product">
            {
                selectedProduct.organic ? <div className="product__organic"><h5>Organic</h5></div> : ""
            }
            <Link onClick={() => handleClearSelectedProduct()} to="/" className="product__back"><span className="emoji-left" role="img" aria-label="xxx">👈</span>Back</Link>
            <div className="product__hero">
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--1">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--2">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--3">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--4">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--5">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--6">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--7">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--8">{selectedProduct.image}</span>
                <span role="img" aria-label="xxx" className="product__emoji product__emoji--9">{selectedProduct.image}</span>
            </div>
            <h2 className="product__name">{selectedProduct.productName}</h2>
            <div className="product__details">
                <p><span role="img" aria-label="xxx" className="emoji-left">🌍</span> {selectedProduct.from}</p>
                <p><span role="img" aria-label="xxx" className="emoji-left">❤️</span> {selectedProduct.nutrients}</p>
                <p><span role="img" aria-label="xxx" className="emoji-left">📦</span> {selectedProduct.quantity}</p>
                <p><span className="emoji-left">🏷</span> {selectedProduct.price}€</p>
            </div>
            <span className="product__link" onClick={() => handleAddShoppingBasket(selectedProduct)}>
                <span role="img" aria-label="xxx" className="emoji-left">🛒</span>
                <span style={{ cursor: "pointer" }}>Add to shopping card ({selectedProduct.price}€)</span>
            </span>
            <p className="product__description">{selectedProduct.description}</p>
        </figure>
    );
}

export default Detail;
