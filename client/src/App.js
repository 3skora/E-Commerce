import "./App.css";
import AllProducts from "./components/AllProducts.jsx";
import AppBar from "./components/AppBar.jsx";
import Login from "./pages/Login.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyCart from "./components/cart/MyCart.jsx";
import Checkout from "./pages/Checkout.jsx";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey =
  "pk_test_51MY0KlJs4OSzk0Saf5Vkdj4HlTOjxxOOJ9lyhbQH13cn9wsgZ5NwJTTHykPg1zv2ipc9OfLSGYwaGFDaDZuCxn3P00ASrayEad";
const stripePromise = loadStripe(stripeKey);
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <BrowserRouter>
          <AppBar />

          <Routes>
            <Route path={`/`} element={<AllProducts />} />
            <Route path={`/login`} element={<Login />} />
            <Route path={`/cart`} element={<MyCart />} />
            <Route path={`/checkout`} element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Elements>
  );
}

export default App;
