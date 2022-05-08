import { useReducer } from "react";
import CartContext from "./cartContext";
import CartReducer from "./cartReducer";
import { ADD_TO_CART, REMOVE_FROM_CART, RESET_CART } from "../Types";

const initialState = {
  cartItems: [],
};

const CartState = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (serviceId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: serviceId });
  };

  const resetCart = () => {
    dispatch({ type: RESET_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
