// dispatch and getState: functions in redux thunk
// that make it possible to dispatch an action and get access

import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

// action dispatched to update the state of the redux store
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  {
    /* value (2nd param) should be a string, not an object */
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

{
  /* 
  removes the item from the cart.
  -- sets payload to product I'm deleting (productId)
  -- saves cartItems in the redux store to localStorage
*/
}
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

{
  /* saves the data about the shipping address
    -- data comes from saveShippingAddress in ShippingAddressScreen */
}
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

/* saves the data about the payment method
    -- data comes from savePaymentMethod in PaymentMethodScreen */
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
