import { RESET_CART, ADD_TO_CART, REMOVE_FROM_CART } from "../Types";

const CartReducer = (state, action) => {
  console.log("Before operation", state);
  if (action.type === ADD_TO_CART) {
    let alreadyExists = state.cartItems.some(
      (element) => element.serviceId === action.payload.serviceId
    );
    if (alreadyExists) {
      return state;
    }
    return {
      ...state,
      cartItems: [...state.cartItems, action.payload],
    };
  } else if (action.type === REMOVE_FROM_CART) {
    return {
      ...state,
      cartItems: state.cartItem.filter(
        (item) => item.serviceId !== action.payload
      ),
    };
  } else if (RESET_CART) {
    return {
      ...state,
      cartItems: [],
    };
  } else {
    return state;
  }
};

export default CartReducer;
