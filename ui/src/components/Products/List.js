import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getProducts, SELECT_PRODUCT } from '../../actions/product';

const Index = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    // get store in products
    const { products } = useSelector(rootReducer => rootReducer.productReducer);

    useEffect(() => {
        // check redux storage products
        if (products.length < 1) {
            // requesting api for products list
            dispatch(getProducts());
        }
    }, [products, dispatch])

    const handleClickProduct = async (product) => {

        // set selected product in redux
        dispatch({
            type: SELECT_PRODUCT,
            payload: {
                selectedProduct: product
            }
        })
        history.push("/detail");
    }

    return (
        <div className="cards-container">
            {
                products.map(product => (
                    <figure key={product.id} className="card">
                        <div className="card__emoji"><span role="img" aria-label="">{product.image}{product.image}</span></div>
                        <div className="card__title-box">
                            <h2 className="card__title">{product.productName}</h2>
                        </div>
                        <div className="card__details">
                            <div className="card__detail-box">
                                <h6 className="card__detail card__detail--organic">{product.organic ? "Organic!" : ""}</h6>
                            </div>
                            <div className="card__detail-box">
                                <h6 className="card__detail">{product.quantity} per <span role="img" aria-label="">📦</span></h6>
                            </div>
                            <div className="card__detail-box">
                                <h6 className="card__detail card__detail--price">{product.price}€</h6>
                            </div>
                        </div>
                        <span style={{ cursor: "pointer" }} className="card__link" onClick={() => handleClickProduct(product)}>
                            <span>Detail <i className="emoji-right"><span role="img" aria-label="">👉</span></i></span>
                        </span>
                    </figure>
                ))
            }
        </div >
    );
}

export default Index;
