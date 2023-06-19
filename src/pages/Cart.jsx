import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import ProductContext from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import SpinnerLoader from "../components/SpinnerLoader";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //get user session
  const { userId, session } = useContext(UserContext);

  const { removeItemFromCart, cart, setCart } = useContext(CartContext);
  const { removeFromCart } = useContext(ProductContext);

  //set cartPrice to 0
  let cartPrice = 0;

  //loop through every product on the cart
  cart.map((product) => {
    //update the value of cart
    cartPrice += product.product_price;
  });

  //handle remove
  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
    removeFromCart(id);
  };

  //filter products that belong to the in session user
  const updatedCart = cart.filter((product) => product.user_id !== userId);

  //update the value of local storage to updatedCart
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));

  const handleCheckOut = () => {
    if (!session) {
      navigate("/signin");
      return;
    }

    //show load spinner
    setIsLoading(!isLoading);

    fetch(`${import.meta.env.VITE_SERVER_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: updatedCart,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        //redirect to payment page after 3000 milliseconds
        setTimeout(() => {
          window.location = url;
        }, 2000);
        toast.success("You will be redirected to the payment page shortly.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });

        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  useEffect(() => {
    //update cart to value of updatedCart
    setCart(updatedCart);
  }, []);

  return (
    <div className="md:mt-24 mt-36 max-w-screen mx-auto">
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          {updatedCart.length > 0 ? (
            <div className="md:flex md:gap-4">
              <div className="md:w-3/4 p-3 mb-4 shadow-md shadow-gray-300 bg-gray-50">
                <div className="">
                  <h2 className=" text-gray-800 dark:text-white text-start text-xl font-medium">
                    Cart {updatedCart.length}
                  </h2>
                  {!updatedCart && <h1>No cart</h1>}
                  {updatedCart.map((item, index) => (
                    <div
                      key={index}
                      className="flex mt-4 md:py-3  py-2 justify-between border-t-2 border-gray-300"
                    >
                      <div className="flex flex-col items-start md:space-y-3 space-y-1.5">
                        <div className="flex space-x-2">
                          <img
                            className="md:h-20 md:w-20 w-16 h-16 object-cover"
                            src={item.product_pic}
                            alt=""
                          />
                          <h3 className="text-lg text-gray-700 dark:text-gray-100 font-normal">
                            {item.product_name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          className="text-primary-700 hover:text-white bg-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 md:py-2.5 py-1 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() => handleRemoveItem(item.$id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 mr-2 -ml-1"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Remove
                        </button>
                      </div>

                      <div>
                        <h3 className="text-2xl font-semibold text-gray-700">
                          ${item.product_price}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/4 md:h-48 p-3 mb-2 shadow-md shadow-gray-300 bg-gray-50 md:space-y-5 space-y-1.5">
                <h3 className="text-gray-800 dark:text-white text-start text-xl font-normal">
                  Cart Summary
                </h3>
                <div className="flex justify-between items-center p-3 border-y-2 border-gray-300 ">
                  <p className="font-medium">SubTotal</p>
                  <h2 className="text-2xl font-semibold text-gray-700">
                    ${cartPrice}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleCheckOut}
                  className="text-white w-full p bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Checkout ({cartPrice}){" "}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-screen">
              {/* if no products match the search term display the following */}
              <div className="h-52 flex flex-col items-center shadow-md justify-center shadow-gray-300 bg-gray-50 ">
                <h1 className="text-2xl text-gray-800 font-semibold mb-4">
                  Your cart is empty!
                </h1>
                <Link
                  to="/home"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  START SHOPPING
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
