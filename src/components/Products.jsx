import React from "react";
import ProductItem from "./ProductItem";

const Products = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-gray-800 dark:text-white text-left mb-3 font-bold">
        New Products
      </h1>
      <div className="grid grid-cols-4 gap-4 mb-6 ">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
      <h1 className="text-3xl text-gray-800 dark:text-white text-left mb-3 font-bold">
        Other Products
      </h1>
      <div className="grid grid-cols-4 gap-4 ">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default Products;
