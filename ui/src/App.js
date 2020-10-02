import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SHOPPING_PRODUCT } from './actions/product';
// css
import './styles/loader.css';
import './styles/style.css';
// components
import Index from './components/Products/List';
import Detail from './components/Products/Detail.js';

const App = () => {

  const initialState = {
    basketModal: false,
  }
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  let { shopping } = useSelector(rootReducer => rootReducer.productReducer);

  // remove item from shopping card
  const handleRemove = async (product) => {
    let index = shopping.basket.findIndex(item => item.id.toString() === product.id.toString());
    if (index > -1) {
      let price = shopping.basket[index].price * shopping.basket[index].quantity;
      shopping.total -= price;
      shopping.basket = await shopping.basket.filter(item => item.id.toString() !== product.id.toString()); // remove deleted data in old datas
      dispatch({
        type: SET_SHOPPING_PRODUCT,
        payload: {
          shopping
        }
      })
    }
  }

  // increase one
  const handleIncrease = async (product) => {
    let index = shopping.basket.findIndex(item => item.id.toString() === product.id.toString());
    if (index > -1) {
      shopping.total += product.price;
      shopping.basket[index].quantity += 1;
      dispatch({
        type: SET_SHOPPING_PRODUCT,
        payload: {
          shopping
        }
      })
    }
  }

  // one decrease
  const handleDecrease = async (product) => {
    let index = shopping.basket.findIndex(item => item.id.toString() === product.id.toString());
    if (index > -1) {

      if (shopping.basket[index].quantity > 1) {
        shopping.total -= product.price;
        shopping.basket[index].quantity -= 1;
        dispatch({
          type: SET_SHOPPING_PRODUCT,
          payload: {
            shopping
          }
        })
      }
    }
  }

  return (
    <div className="App">
      <span onClick={() => setState(prevState => ({ ...prevState, basketModal: true }))} className="basket" >
        <svg height="512pt" viewBox="0 -31 512.00033 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0" /><path d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0" /><path d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0" /></svg>
      </span>
      <div style={{ display: state.basketModal ? "block" : "none" }} className="modal">
        {/* Modal content */}
        <div className="modal-content">
          <span style={{ fontSize: "25px" }}>Your Shopping List..</span>
          <span onClick={() => setState(prevState => ({ ...prevState, basketModal: false }))} className="close">×</span>

          <div className="shoppingList" style={{ margin: "15px" }}>
            {
              shopping.basket.map(product => (<div key={product.id} className="shoppingItem">
                <span className="shoppingImg shoppingField" role="img" aria-label="xxxx">{product.img}</span>
                <span className="shoppingTitle shoppingField">{product.title}</span>
                <span className="shoppingPrice shoppingField">Price: {product.price}€</span>
                <span className="shoppingQuantity shoppingField">
                  Quantity:
                <button type="button"
                    style={{
                      fontSize: "30px", padding: "0px", margin: "0 10px", border: "none", background: "none"
                    }}
                    onClick={() => handleDecrease(product)}
                  >-</button>
                  <input type="text"
                    disabled
                    onChange={() => { }}
                    style={{ padding: "5px", width: "70px", textAlign: "center", fontSize: "23px", color: "green" }}
                    value={product.quantity} />
                  <button type="button"
                    style={{
                      fontSize: "30px", padding: "0px", margin: "0 10px", border: "none", background: "none"
                    }}
                    onClick={() => handleIncrease(product)}
                  >+</button>
                </span>
                <span className="shoppingTotal shoppingField">Total: {product.quantity * product.price}€</span>
                <span className="shoppingRemove shoppingField">
                  <button style={{
                    fontSize: "15px", color: "red", background: "none", border: "none", cursor: "pointer"
                  }}
                    onClick={() => handleRemove(product)}>
                    Remove
                </button>
                </span>
              </div>))
            }
            <div style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "flex-end",
              color: "#58cc1f",
            }}>Total: {shopping.total}€</div>
          </div>

        </div>
      </div>
      <hr />
      <div className="container">
        <h1><span role="img" aria-label="">🌽</span>YOUR Farm <span role="img" aria-label="">🥦</span></h1>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/detail" component={Detail} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div >
  );
}

export default App;
