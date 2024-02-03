import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingsScreen from "./screens/ShippingsScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/products/:id" element={<ProductScreen />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>

{/* BELOW ARE THE PRIVATE ROUTES  */}
      <Route path='' element={<PrivateRoutes/>}>
        <Route path='/shipping' element={<ShippingsScreen />}></Route>
        <Route path='/payment' element={<PaymentScreen />}></Route>
        <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>

      </Route>

      {/* ADMIN ROUTES  */}
      


    </Route>,
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
