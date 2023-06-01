import React from "react";
import UserProduct from "../components/UserProduct";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="mt-24">
      <div>
        <form className="md:space-y-6" action="#">
          <div className="flex text-center space-x-5 items-center">
            <img
              className="w-24 h-24 rounded-full shadow-lg"
              src="/assests/images/empty-profile.png"
              alt="Bonnie image"
            />
            <h2
              to="/home/profile"
              className="mb-1 text-3xl font-medium text-gray-900 dark:text-white"
            >
              Bonnie Green
            </h2>
          </div>
          <div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file_input"
              >
                Choose photo
              </label>
              <input
                class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-primary-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              ></input>
            </div>
          </div>
          <h3 className="text-xl font-bold dark:text-white">
            Personal Details
          </h3>
          <div class="grid md:grid-cols-2 md:gap-6 py-5 mt-5 border-t  border-gray-200 dark:border-gray-700">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <label
                for="id_card"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Identification Card
              </label>
              <input
                type="text"
                id="id_card"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. 38696406"
                required
              />
            </div>
            <div>
              <label
                for="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="phone_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="+254712345678"
                required
              />
            </div>
          </div>
          <div className="text-end">
            <button
              type="submit"
              className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-5 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold my-3 dark:text-white">
            Items on sell
          </h3>
          <div className="grid grid-cols-4 gap-4 ">
            <UserProduct />
            <UserProduct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
