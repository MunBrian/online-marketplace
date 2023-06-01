import React from "react";

const Cart = () => {
  return (
    <div className="flex mt-24 gap-4 mx-auto">
      <div className="w-3/4 p-3 shadow-md shadow-gray-300 bg-gray-50">
        <div className="">
          <h2 className=" text-gray-800 dark:text-white text-start text-xl font-medium">
            Cart 1
          </h2>
          <div className="flex mt-4 py-3 justify-between border-t-2 border-gray-300">
            <div className="flex flex-col items-start space-y-3">
              <div className="flex space-x-2">
                <img
                  className="h-20"
                  src="/assests/images/headphones.jpg"
                  alt=""
                />
                <h3 className="text-lg text-gray-700 dark:text-gray-100 font-normal">
                  Sony HeadPhones
                </h3>
              </div>
              <button
                type="button"
                className="text-primary-700 hover:text-white bg-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Remove
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-700">$100</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 p-3 shadow-md shadow-gray-300 bg-gray-50 space-y-5">
        <h3 className="text-gray-800 dark:text-white text-start text-xl font-normal">
          Cart Summary
        </h3>
        <div className="flex justify-between items-center p-3 border-y-2 border-gray-300 ">
          <p className="font-medium">SubTotal</p>
          <h2 className="text-2xl font-semibold text-gray-700">$100</h2>
        </div>
        <button
          type="button"
          className="text-white w-full p bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Checkout ($100){" "}
        </button>
      </div>
    </div>
  );
};

export default Cart;
