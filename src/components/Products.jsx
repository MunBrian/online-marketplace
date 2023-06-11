import { useContext, useEffect } from "react";
import ProductItem from "./ProductItem";
import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import SpinnerLoader from "./SpinnerLoader";
import UserContext from "../context/UserContext";

const Products = () => {
  //get products array from ProductContect
  const { products, orders } = useContext(ProductContext);

  //get carts items from Cart Context
  const { cart } = useContext(CartContext);

  const { userId } = useContext(UserContext);

  //filter out products already in the cart
  //filter out products already sold
  //filter out products where the session userid is same as that of the products userId
  const newProducts = products.filter(
    (product) =>
      !cart.some((item) => item.$id === product.$id) &&
      product.user_id !== userId &&
      !orders.some((item) => item.product_name === product.product_name)
  );

  // Loop through all products and store the categories within the categories set
  const categories = new Set(
    newProducts.map((product) => product.product_category)
  );

  //Change set into array
  const categoriesArray = Array.from(categories);

  return (
    <div className="p-4 max-w-screen">
      {products.length === 0 ? (
        <SpinnerLoader />
      ) : (
        <>
          {/* loop through the categoriesArray to display available categories */}
          {categoriesArray.map((Category, index) => (
            <div key={index}>
              <h1 className="md:text-2xl text-xl text-gray-600 dark:text-white text-left mb-3 font-normal">
                {Category}
              </h1>
              <div className="md:grid md:grid-cols-4 md:gap-4 md:mb-6 md:h-fit grid grid-cols-2 gap-1 mb-2 ">
                {/* loop through all products and display them according to the type of category they fall under */}
                {newProducts.map(
                  (product, index) =>
                    product.product_category === Category && (
                      <ProductItem key={index} product={product} />
                    )
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Products;
