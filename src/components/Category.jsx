import React from "react";

const Category = () => {
  return (
    <div className="flex p-4 my-4">
      <a
        href="#"
        class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 p-2 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-primary-800 hover:text-white"
      >
        Electronics
      </a>
      <a
        href="#"
        class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-primary-800 hover:text-white"
      >
        Clothes & Shoes
      </a>
      <a
        href="#"
        class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-primary-800 hover:text-white"
      >
        Home Decors
      </a>
      <a
        href="#"
        class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-2 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-primary-800 hover:text-white"
      >
        Others
      </a>
    </div>
  );
};

export default Category;
