import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { databases } from "../appwrite/appConfig";
import { toast } from "react-toastify";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Lottie from "lottie-react";
import SuccessAnimation from "/src/assests/animations/success.json";

import "react-toastify/dist/ReactToastify.css";
import CartContext from "../context/CartContext";
import SpinnerLoader from "./SpinnerLoader";

const Checkout = () => {
  //get userId and userDetails from UserContext
  const { userId, userDetails } = useContext(UserContext);

  //get user name from userDetails
  const { name } = userDetails;

  //get products from cart
  const cart = JSON.parse(localStorage.getItem("cartItems"));

  //set cartPrice to 0
  let cartPrice = 0;

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
    if (userId && name) {
      //loop through all items(products) in the cart and post them to order database
      const promises = cart.map((item) => handlePostOrder(item, userId));

      //handle promise
      Promise.all(promises)
        .then(function (response) {
          //redirect to dashboard after 5000 milliseconds
          setTimeout(() => {
            window.location.href = "/home/orders";
          }, 2000);

          toast.success(
            "Payment was successfull. You will be redirected to the orders page.",
            {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            }
          );

          //delete all items from the localstorage
          localStorage.removeItem("cartItems");
        })
        .catch(function (error) {
          console.log("Error posting orders:", error);
        });
    }
  }, [userId, name]);
  return (
    <>
      {!name ? (
        <SpinnerLoader />
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-2/5 p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col space-y-4 items-center pb-6 ">
              <Lottie
                animationData={SuccessAnimation}
                className="w-32"
                loop={false}
              />
              <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
                Payment Successful
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
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
