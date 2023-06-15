import { useContext } from "react";
import { Link } from "react-router-dom";
import UserProduct from "../components/UserProduct";
import ProductContext from "../context/ProductContext";
import UserContext from "../context/UserContext";

const Dashboard = () => {
  //get products from productContext
  const { products, orders } = useContext(ProductContext);

  //get userDetails from UserContext
  const { userDetails, userId } = useContext(UserContext);

  const { name, email } = userDetails;

  //get products whose order.user_id matches the current user in session to get sold products
  const soldItems = orders.filter((order) => order.user_id === userId);

  //get products that have user_id same as current useer in session and products that name do not match sold products
  const userProducts = products.filter(
    (product) =>
      product.user_id === userDetails.$id &&
      !soldItems.some((item) => item.product_name === product.product_name)
  );

  return (
    <div className="md:mt-24 mb-4 mt-36 mx-auto">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hello, {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {email}
        </p>
      </div>
      <div className="mt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="border-gray-200 dark:border-gray-700 mb-4">
          <h3 className="text-xl font-bold my-3 dark:text-white">
            Items on sell
          </h3>
          {userProducts.length === 0 ? (
            <div className="">
              {/* if user has no products on sell*/}
              <div className="h-52 flex flex-col items-center shadow-md justify-center shadow-gray-300 bg-gray-50 ">
                <h1 className="text-2xl text-gray-800 font-semibold mb-4">
                  No items on sell
                </h1>
                <Link
                  to="/home/sell-item"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sell Product
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 ">
              {userProducts.map((product, index) => (
                <UserProduct key={index} product={product} />
              ))}
            </div>
          )}
        </div>
        <div className="border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold my-3 dark:text-white">Items Sold</h3>
          {soldItems.length === 0 ? (
            <div className="">
              {/* if user has no products on sell*/}
              <div className="h-52 flex items-center shadow-md justify-center shadow-gray-300 bg-gray-50 ">
                <h1 className="text-2xl text-gray-800 font-semibold mb-4">
                  No items sold yet
                </h1>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 ">
              {soldItems.map((product, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <img
                      className="rounded-t-lg object-cover h-48 w-full"
                      src={product.product_pic}
                      alt="product image"
                    />
                  </div>
                  <div className="px-5 my-3 space-y-5">
                    <div className="my-5">
                      <h5 className="md:text-xl text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.product_name}
                      </h5>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.product_price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
