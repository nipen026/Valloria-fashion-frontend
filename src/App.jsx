import Home from "./Pages/Home";
import './App.css'
import { useEffect } from "react";
import ProductDetailPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage";
import ShippingPage from "./Pages/ShippingPage";
import TrackOrderPage from "./Pages/TrackOrderPage";
import { Route, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing";
import Login from "./Common/Login";
import Register from "./Common/Register";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import LoginSuccess from "./Components/LoginSuccess";
import MyAccount from "./Components/MyAccount";
import WishlistPage from "./Pages/WishlistPage";
function App() {
   useEffect(() => {
    const userPref = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (userPref === 'dark' || (!userPref && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/productDetails/:id" element={<ProductDetailPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/shipping" element={<ShippingPage/>}/>
      <Route path="/track" element={<TrackOrderPage/>}/>
      <Route path="/productListing" element={<ProductListing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/account" element={<MyAccount/>}/>
      <Route path="/login/success" element={<LoginSuccess />} />
    
    </Routes>
    </>
  );
}

export default App;
