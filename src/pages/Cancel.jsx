import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="max-w-screen-xl mx-auto h-screen p-4 mt-24">
      <div className="flex items-center justify-center">
        <div className="w-2/5 p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col space-y-4 items-center pb-6 ">
            <svg
              fill="none"
              stroke="currentColor"
              className="w-12 stroke-red-600 stroke-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-400">
              Payment Failed!!
            </h5>
          </div>
          <div className="py-2 mt-3">
            <div className="md:flex md:items-center md:justify-between space-y-3">
              <Link
                to="/home/cart"
                className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Try Again
              </Link>
              <Link
                to="/home"
                className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
