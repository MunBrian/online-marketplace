import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";
import UserContext from "../context/UserContext";
import ProductContext from "../context/ProductContext";
import SpinnerLoader from "../components/SpinnerLoader";

const ProductDetails = () => {
  //get userId from userContext
  const { userId } = useContext(UserContext);

  const [hideButton, setHideButton] = useState(false);

  //get all products from ProductContext
  const { products } = useContext(ProductContext);

  const param = useParams();

  //filter through all product and store products whose id matches the url id
  const productDetails = products.filter((product) => product.$id === param.id);

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:mt-24 mt-36">
      {productDetails.length === 0 ? (
        <SpinnerLoader />
      ) : (
        <>
          {productDetails.map((product, index) => (
            <div key={index}>
              <div className="md:grid md:grid-cols-2 md:gap-6 block">
                <div className="h-auto">
                  <img
                    src={product.product_pic}
                    className="object-cover rounded-md w-full h-80"
                    alt="headphones"
                  />
                </div>
                <div className="md:px-6 mt-2">
                  <h1 className="md:text-3xl text-2xl md:mb-4 mb-2 font-bold tracking-wide text-gray-800 dark:text-white">
                    {product.product_name}
                  </h1>
                  <p className="text-gray-800 md:text-2xl text-xl font-bold md:mb-4 mb-2">
                    ${product.product_price}{" "}
                  </p>
                  <div className="md:py-2">
                    <span className="text-sm text-gray-800 font-medium border-b-2 border-gray-800">
                      Details
                    </span>
                    <p className="text-gray-500 text-sm font-medium md:mb-4 md-1 leading-6">
                      {product.product_description}
                    </p>
                  </div>
                  <div
                    className={
                      product.user_id === userId
                        ? "hidden"
                        : "md:flex py-4 mb:mt-2"
                    }
                  >
                    {hideButton ? (
                      <></>
                    ) : (
                      <AddToCart
                        product={product}
                        setHideButton={setHideButton}
                        hideButton={hideButton}
                        style={
                          "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 md:mb-2"
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
