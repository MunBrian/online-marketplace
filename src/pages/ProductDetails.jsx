import React from "react";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-4 mt-24">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <img
            src="/assests/images/headphones.jpg"
            className="object-cover w-full rounded-md"
            alt="headphones"
          />
        </div>
        <div className="px-6">
          <h1 className="text-3xl mb-4 font-bold tracking-wide text-gray-800 dark:text-white">
            Sony Headphones
          </h1>
          <p className="text-sm font-medium mb-4 text-gray-500 leading-6 dark:text-gray-500">
            Top quality headphones. Made by Sony.
          </p>
          <p className="text-gray-800 text-2xl font-bold mb-4">$100.00 </p>
          <p className="text-sm font-medium mb-4 text-gray-500 leading-6 dark:text-gray-500">
            Listed by{" "}
            <a href="" className="text-primary-700 hover:text-primary-800">
              admin
            </a>
          </p>
          <div className="py-2">
            <span className="text-sm text-gray-800 font-medium border-b-2 border-gray-800">
              Details
            </span>
            <p className="text-gray-500 text-sm font-medium mb-4 leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              fringilla tortor quis venenatis ornare. Quisque vestibulum massa
              non convallis tempus. Ut nec ex imperdiet nisi consequat feugiat.
              Proin accumsan enim vel vestibulum molestie. Nam auctor facilisis
              ex, eget mollis nisi ultricies cursus. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Vestibulum maximus leo ut tellus hendrerit, vitae fermentum risus
              tincidunt. Cras eu faucibus nunc. Aenean pellentesque ex nec
              tempus tincidunt. Vivamus molestie sagittis nibh, sit amet
              ultrices lacus mollis sit amet.{" "}
            </p>
          </div>
          <div className="flex py-4 mt-4">
            <Link
              to="/home/cart"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buy Now
            </Link>
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
