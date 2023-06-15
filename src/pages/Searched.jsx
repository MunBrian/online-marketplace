import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import ProductItem from "../components/ProductItem";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import SpinnerLoader from "../components/SpinnerLoader";

const Searched = () => {
  const param = useParams();

  //get userID from userContext
  const { userId } = useContext(UserContext);

  //get cart products from cartContext
  const { cart } = useContext(CartContext);

  //get all products from the ProductContext
  const { products, orders } = useContext(ProductContext);

  //get search term from the url
  const { search } = param;

  //filter through all product and
  //1. store products whose name matches the serached term
  //2. filter out product that match userId logged in
  //3. filter out product that are already in the cart
  //4. filter out products that have already been order
  const filteredProducts = products.filter(
    (product) =>
      (product.product_name.toLowerCase().includes(search.toLowerCase()) ||
        product.product_category === search) &&
      product.user_id !== userId &&
      !cart.some((item) => item.$id === product.$id) &&
      !orders.some((item) => item.product_name === product.product_name)
  );

  return (
    <div className="max-w-screen-xl mx-auto h-screen p-4 md:mt-24 mt-36">
      {products.length === 0 ? (
        <SpinnerLoader />
      ) : (
        <>
          {/* check the length of the filtered products */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-4 md:mb-4 md:gap-4 grid-cols-2 mb-2 gap-1">
              {filteredProducts.map((product, index) => (
                <ProductItem product={product} key={index} />
              ))}
            </div>
          ) : (
            // if no products match the search term display the following
            <div className="text-center">
              <h1 className="text-2xl text-gray-800 font-semibold">
                There are no results for product {search}.
              </h1>
              <p className="text-base font-light">
                - Check your spelling for typing errors
              </p>
              <p className="text-base font-light mb-6">
                - Try searching with short and simple keywords
              </p>
              <Link
                to="/home"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to HomePage
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Searched;
