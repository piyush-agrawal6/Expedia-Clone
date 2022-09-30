import React from "react";
import { createContext, useReducer } from "react";
import { citiesData } from "../Data";
import { cartReducer } from "./Reducer";
export const CartState = createContext();
const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: citiesData,
    cart: [],
  });
  return (
    <CartState.Provider value={{ state, dispatch }}>
      {children}
    </CartState.Provider>
  );
};

export default ContextProvider;
