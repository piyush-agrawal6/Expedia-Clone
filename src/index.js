import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "./Context/AuthContext";
import ContextProvider from "./Context/FavContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthContextProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);
