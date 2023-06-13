import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { databases } from "../appwrite/appConfig";
import { toast } from "react-toastify";
import { useContext } from "react";
import UserContext from "../context/UserContext";

import "react-toastify/dist/ReactToastify.css";
import CartContext from "../context/CartContext";

const Checkout = () => {
  //get userId and userDetails from UserContext
  const { userId, userDetails } = useContext(UserContext);

  //get user name from userDetails
  const { name } = userDetails;

  //get products from cart
  const cart = JSON.parse(localStorage.getItem("cartItems"));

  //set cartPrice to 0
  let cartPrice = 0;

  console.log(cart);

  //loop through every product on the cart
  cart.map((product) => {
    //update the value of cart
    cartPrice += product.product_price;
  });

  const handlePostOrder = async (item, userId) => {
    const {
      product_name,
      product_description,
      product_pic,
      product_price,
      product_category,
      user_id,
    } = item;

    //save product details to appwrite db
    return databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_ORDERS_COLLECTION_ID,
      uuid(),
      {
        product_name,
        product_description,
        product_pic,
        product_price,
        product_category,
        user_id,
        buyer_id: userId,
      }
    );
  };

  useEffect(() => {
    //check if userId exists
    if (userId) {
      //loop through all items(products) in the cart and post them to order database
      const promises = cart.map((item) => handlePostOrder(item, userId));

      //handle promise
      Promise.all(promises)
        .then(function (response) {
          console.log("All orders posted successfully:", response);
          //redirect to dashboard after 5000 milliseconds
          setTimeout(() => {
            window.location.href = "/home/orders";
          }, 5000);

          //delete all items from the localstorage
          localStorage.removeItem("cartItems");
          toast.success(
            "Payment was successfull. You will be redirected to the orders page.",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            }
          );
        })
        .catch(function (error) {
          console.log("Error posting orders:", error);
        });
    }
  }, [userId]);
  return (
    <div className="flex items-center justify-center">
      <div className="w-2/5 p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col space-y-4 items-center pb-6 ">
          <svg
            fill="none"
            className="w-12 stroke-primary-800 stroke-2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            ></path>
          </svg>
          <h5 className="mb-2 text-md font-normal tracking-tight text-gray-900 dark:text-gray-400">
            Payment Success!
          </h5>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ${cartPrice}
          </h1>
        </div>
        <div className="border-t border-gray-500 py-6">
          <div className="flex justify-between p-2">
            <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Sender
            </span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">
              {name}
            </div>
          </div>
        </div>
        <div className="border-y border-dashed border-gray-500 py-3">
          <div className="flex justify-between">
            <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Total Payment
            </span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">
              ${cartPrice}
            </div>
          </div>
        </div>
        {/* <div className="py-2 mt-3">
              <div className="flex items-center justify-between">
                <a
                  href="/home"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Continue Shopping
                </a>
                <Link
                  to="/home/order"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  See Orders
                </Link>
              </div>
            </div> */}
      </div>
    </div>
  );
};

export default Checkout;
