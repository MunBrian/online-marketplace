import React, { useState, useContext, useEffect } from "react";
import { databases } from "../appwrite/appConfig";
import { v4 as uuid } from "uuid";
import { storage } from "../appwrite/appConfig";
import SpinnerLoader from "../components/SpinnerLoader";
import UserContext from "../context/UserContext";
import ProductContext from "../context/ProductContext";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  //initialize param
  const param = useParams();

  //initialize pathname
  const { pathname } = useLocation();

  //get userId from userContext
  const { userId } = useContext(UserContext);

  //get edit and setEdit state from productContext
  const { edit, setEdit } = useContext(ProductContext);

  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    product_pic: null,
    product_description: "",
    product_name: "",
    product_price: 0,
    user_id: "",
    product_category: "",
  });

  //check pathname
  if (pathname.includes("/home/edit-item/" + param.id)) {
    //change edit state to true
    setEdit(true);
  }

  //handle product photo
  const handleProductImage = (e) => {
    setProduct({
      ...product,
      product_pic: e.target.files[0],
    });
  };

  //
  const handlePostProduct = async (e) => {
    e.preventDefault();

    //show load spinner
    setIsLoading(!isLoading);

    //store product image in appwrite storage
    const photoResponse = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,
      uuid(),
      product.product_pic
    );

    //convert photo to url
    const photoURL = await storage.getFileView(
      import.meta.env.VITE_BUCKET_ID,
      photoResponse.$id
    ).href;

    if (product.product_description.length > 1000) {
      toast.error("Product Description must be less than 1000 characters.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      setIsLoading(false);
      return;
    }

    //save product details to appwrite db
    const promise = databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      uuid(),
      {
        ...product,
        //add photourl to appwrite db
        product_pic: photoURL,
        user_id: userId,
      }
    );

    promise.then(
      function (response) {
        setTimeout(() => {
          //redirect to dashboard after 5000 milliseconds
          window.location.href = "/home/dashboard";
        }, 5000);

        toast.success(
          "Product was successful Created. You will be redirected to the Dashboard.",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          }
        );
      },
      function (error) {
        toast.error("Error creating the product. Please try again", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    );

    //hide load spinner
    setIsLoading(false);
  };

  //edit product
  const handleEditProduct = async (e) => {
    e.preventDefault();

    //show load spinner
    setIsLoading(!isLoading);

    //split product pic url into array by "/"
    const data = product.product_pic.split("/");

    //get fileId from the product_pic url
    const fileId = data[8];

    //store product image in appwrite storage
    const photoResponse = await storage.updateFile(
      import.meta.env.VITE_BUCKET_ID,
      fileId
    );

    //convert photo to url
    const photoURL = await storage.getFileView(
      import.meta.env.VITE_BUCKET_ID,
      photoResponse.$id
    ).href;

    if (product.product_description.length > 1000) {
      toast.error("Product Description must be less than 1000 characters.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      setIsLoading(false);

      return;
    }

    //save product details to appwrite db
    const promise = databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      param.id,
      {
        ...product,
        //add photourl to appwrite db
        product_pic: photoURL,
        user_id: userId,
      }
    );

    promise.then(
      function (response) {
        //redirect to dashboard after 5000 milliseconds
        setTimeout(() => {
          window.location.href = "/home/dashboard";
        }, 5000);

        toast.success(
          "Product was successful edited. You will be redirected to the Dashboard.",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          }
        );
      },
      function (error) {
        toast.error("Error. Please try again", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    );

    //hide load spinner
    setIsLoading(false);
  };

  //get product details
  const getProductDetails = () => {
    const product = databases.getDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      param.id
    );

    product.then(
      function (response) {
        const {
          product_name,
          product_pic,
          product_category,
          product_description,
          product_price,
          user_id,
        } = response;
        setProduct({
          product_pic,
          product_description,
          product_name,
          product_price,
          user_id,
          product_category,
        });
        //hide loading spinner
        setIsLoading(false);
      },
      function (error) {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    //show loading spinner
    setIsLoading(true);
    getProductDetails();
  }, [param.id]);

  return (
    <div className="md:mt-24 mt-36 flex justify-center">
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          {edit ? (
            <div className="md:w-2/4 flex flex-col">
              <h1 className="mb-8 text-center text-3xl text-gray-800 font-bold dark:text-white">
                Edit Product
              </h1>
              <form onSubmit={handleEditProduct}>
                <div className="mb-6">
                  <label
                    for="item_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="item_name"
                    name="product_name"
                    value={product.product_name}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_name: e.target.value,
                      })
                    }
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="item_description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Item Description
                  </label>
                  <textarea
                    id="item_description"
                    name="product_description"
                    rows="4"
                    value={product.product_description}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_description: e.target.value,
                      })
                    }
                    placeholder="Add item description"
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose Category
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value={product.product_category}>
                      {product.product_category}
                    </option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Phone & Computers">Phone & Computers</option>
                    <option value="Electronics & Accessories">
                      Electronics & Accessories
                    </option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Fashion & Shoewear">
                      Fashion & Shoewear
                    </option>
                    <option value="Beauty & Personal care">
                      Beauty & Personal care
                    </option>
                    <option value="Sports & Outdoor">Sports & Outdoor</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    for="item_price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Item Price($)
                  </label>
                  <input
                    type="number"
                    id="item_price"
                    name="product_price"
                    value={product.product_price}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_price: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Choose product photo
                  </label>
                  <input
                    className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-primary-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    name="photoFile"
                    onChange={
                      // setProduct({
                      //   ...product,
                      //   product_pic: e.target.files[0],
                      // })
                      handleProductImage
                    }
                    type="file"
                  ></input>
                </div>
                <button
                  type="submit"
                  className="text-white w-full p bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </form>
            </div>
          ) : (
            <div className="md:w-2/4 flex flex-col">
              <h1 className="mb-8 text-center text-3xl text-gray-800 font-bold dark:text-white">
                List Product for Sale
              </h1>
              <form onSubmit={handlePostProduct}>
                <div className="mb-6">
                  <label
                    for="item_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="item_name"
                    name="product_name"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_name: e.target.value,
                      })
                    }
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="item_description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Item Description
                  </label>
                  <textarea
                    id="item_description"
                    name="product_description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_description: e.target.value,
                      })
                    }
                    placeholder="Add item description"
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label
                    for="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose Category
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value={product.product_category}>
                      Choose category
                    </option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Phone & Computers">Phone & Computers</option>
                    <option value="Electronics & Accessories">
                      Electronics & Accessories
                    </option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                    <option value="Fashion & Shoewear">
                      Fashion & Shoewear
                    </option>
                    <option value="Beauty & Personal care">
                      Beauty & Personal care
                    </option>
                    <option value="Sports & Outdoor">Sports & Outdoor</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    for="item_price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Item Price($)
                  </label>
                  <input
                    type="number"
                    id="item_price"
                    name="product_price"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        product_price: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Choose product photo
                  </label>
                  <input
                    className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-primary-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    name="photoFile"
                    onChange={
                      // setProduct({
                      //   ...product,
                      //   product_pic: e.target.files[0],
                      // })
                      handleProductImage
                    }
                    type="file"
                  ></input>
                </div>
                <button
                  type="submit"
                  className="text-white w-full p bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Add Item
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductForm;
