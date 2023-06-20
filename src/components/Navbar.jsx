import { useContext } from "react";
import { account } from "../appwrite/appConfig";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import Search from "./Search";
import { useState } from "react";

const Navbar = () => {
  const [dropdown, setDropDown] = useState(false);
  //get cart items
  const { cart } = useContext(CartContext);

  //get user session
  const { session, userDetails } = useContext(UserContext);

  //get user name from userDetails
  const { name } = userDetails;

  //Logout handler
  const logOutUser = () => {
    //delete session
    const deleteSession = account.deleteSession("current");

    deleteSession.then(
      function (response) {
        //delete cart from localstorage
        localStorage.clear();
        window.location.href = "/home";
      },
      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <nav className="bg-white dark:bg-gray-900 z-50 fixed w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex  flex-wrap  space-y-2 items-center justify-between mx-auto p-4">
        <Link to="/home">
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            O-Market
          </span>
        </Link>
        <div className="hidden md:block">
          <Search />
        </div>
        <div className="hidden md:block relative">
          <ul className="flex gap-6 items-center">
            <li>
              <button
                id="dropdownNavbarList"
                onClick={() => setDropDown(!dropdown)}
                data-dropdown-toggle={dropdown ? "dropdownNavbar" : null}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                <svg
                  className="w-6 h-6 mr-2 text-primary-700 stroke-2 hover:text-primary-800"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  ></path>
                </svg>
                {session ? "Hi, " + name : "Account"}
                <svg
                  className="w-5 h-5 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                id={dropdown ? "dropdownNavbar" : null}
                className={
                  dropdown
                    ? " absolute z-10 font-normal bg-white divide-y divide-gray-100 px-2 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    : "hidden z-10 absolute font-normal bg-white divide-y divide-gray-100 px-2 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                }
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <Link
                      to={!session ? "/signin" : "/home/dashboard"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={!session ? "/signin" : "/home/sell-item"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sell Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={!session ? "/signin" : "/home/orders"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  {!session ? (
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-center text-sm text-white bg-primary-700 hover:bg-primary-800 dark:hover:bg-gray-800 dark:text-white"
                    >
                      Sign In
                    </Link>
                  ) : (
                    <button
                      onClick={logOutUser}
                      className="block px-4 py-2 w-full text-center text-sm text-white bg-primary-700 hover:bg-primary-800 dark:hover:bg-gray-800 dark:text-white"
                    >
                      Log out
                    </button>
                  )}
                </div>
              </div>
            </li>
            <li>
              <Link
                className="flex text-center items-center gap-3 hover:text-primary-800 font-medium"
                to="/home/cart"
              >
                <div className="flex relative">
                  <svg
                    className="w-6 h-6 text-primary-700 stroke-2 hover:text-primary-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    ></path>
                  </svg>
                  <div className="absolute -top-3 -right-3 text-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                    {cart.length}
                  </div>
                </div>
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:hidden relative px-2">
          <ul className="flex space-x-2 items-center justify-between">
            <li>
              <button
                id="dropdownNavbarList"
                onClick={() => setDropDown(!dropdown)}
                data-dropdown-toggle={dropdown ? "dropdownNavbar" : null}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                <svg
                  className="w-6 h-6 text-primary-700 stroke-2 hover:text-primary-800"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  ></path>
                </svg>
                <svg
                  className="w-5 h-5 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                id={dropdown ? "dropdownNavbar" : null}
                className={
                  !dropdown
                    ? "hidden absolute right-6 z-10 font-normal bg-white divide-y divide-gray-100 px-2 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    : "z-10 absolute right-6  font-normal bg-white divide-y divide-gray-100 px-2 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                }
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <Link
                      to={!session ? "/signin" : "/home/dashboard"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={!session ? "/signin" : "/home/sell-item"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sell Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={!session ? "/signin" : "/home/orders"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  {!session ? (
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-center text-sm text-white bg-primary-700 hover:bg-primary-800 dark:hover:bg-gray-800 dark:text-white"
                    >
                      Sign In
                    </Link>
                  ) : (
                    <button
                      onClick={logOutUser}
                      className="block px-4 py-2 w-full text-center text-sm text-white bg-primary-700 hover:bg-primary-800 dark:hover:bg-gray-800 dark:text-white"
                    >
                      Log out
                    </button>
                  )}
                </div>
              </div>
            </li>
            <li>
              <Link
                className="flex text-center items-center gap-3 hover:text-primary-800 font-medium"
                to="/home/cart"
              >
                <div className="flex relative">
                  <svg
                    className="w-6 h-6 text-primary-700 stroke-2 hover:text-primary-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    ></path>
                  </svg>
                  <div className="absolute -top-3 -right-3 text-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">
                    {cart.length}
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:hidden flex-initial w-full">
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
