import { useContext, useEffect } from "react";
import ProductItem from "./ProductItem";
import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import SpinnerLoader from "./SpinnerLoader";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

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

  //prooducts to show
  //const productsToShow = newProducts.slice(0, displayCount);

  // Loop through all products and store the categories within the categories set
  const categories = new Set(
    newProducts.map((product) => product.product_category)
  );

  //Change set into array
  const categoriesArray = Array.from(categories);

  const handleCategory = (category) => {
    //navigate to the search page and pass the searched input
    navigate("searched/" + category);
  };

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
              <div className="bg-gray-100 p-4 relative">
                <button
                  onClick={() => handleCategory(Category)}
                  className="bg-blue-100 right-0 top-2 absolute text-blue-800 text-xs font-medium mr-2 px-2.5 p-2 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-primary-800 hover:text-white"
                >
                  Show More
                </button>
                <div className="md:grid md:grid-cols-4 md:gap-4 md:h-fit grid grid-cols-2 gap-1 ">
                  {newProducts
                    .filter((product) => product.product_category === Category)
                    .slice(0, 4)
                    .map((product, index) => (
                      <ProductItem key={index} product={product} />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Products;
