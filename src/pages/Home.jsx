import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Products from "../components/Products";
import Category from "../components/Category";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Dashboard from "./Dashboard";
import ProductForm from "./ProductForm";
import Searched from "./Searched";
import Footer from "../components/Footer";
import Orders from "./Orders";

const Home = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-screen">
      <div className=" max-w-screen-xl mx-auto bg-white dark:bg-gray-900">
        <Navbar />
        {pathname === "/home" && <Carousel />}
        {pathname === "/home" && <Category />}
        {pathname === "/home" && <Products />}
        <Routes>
          <Route path="/product-detail/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sell-item" element={<ProductForm />} />
          <Route path="/edit-item/:id" element={<ProductForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/searched/:search" element={<Searched />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
