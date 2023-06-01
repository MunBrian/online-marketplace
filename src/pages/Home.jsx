import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import Category from "../components/Category";
import ProductDetails from "./ProductDetails";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./Cart";
import Dashboard from "./Dashboard";
import ProductForm from "./ProductForm";

const Home = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <div className=" max-w-screen-xl mx-auto bg-white dark:bg-gray-900">
      <Navbar />
      {pathname === "/home" && <Carousel />}
      {pathname === "/home" && <Category />}
      {pathname === "/home" && <Products />}
      <Routes>
        <Route path="/product-detail" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sell-item" element={<ProductForm />} />
        <Route path="/edit-item" element={<ProductForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Home;
