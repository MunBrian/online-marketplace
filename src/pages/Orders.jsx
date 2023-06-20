import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import UserContext from "../context/UserContext";

const Orders = () => {
  const { orders } = useContext(ProductContext);
  const { userId } = useContext(UserContext);

  const userOrders = orders.filter((item) => item.buyer_id === userId);

  return (
    <div className="md:mt-24 max-w-screen mt-36">
      {userOrders.length > 0 ? (
        <div className="md:w-3/4 p-3 shadow-md mb-4 h-fit shadow-gray-300 bg-gray-50">
          <div className="">
            <h2 className=" text-gray-800 dark:text-white text-start text-xl font-medium">
              Order {userOrders.length}
            </h2>
            {userOrders.map((order, index) => (
              <div
                key={index}
                className="flex mt-4 py-3 justify-between border-t-2 border-gray-300"
              >
                <div className="flex items-start">
                  <div className="flex space-x-2">
                    <img
                      className="h-20 w-20 object-cover"
                      src={order.product_pic}
                      alt=""
                    />
                    <h3 className="text-lg text-gray-700 dark:text-gray-100 font-normal">
                      {order.product_name}
                    </h3>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-700">
                    ${order.product_price}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          {/* if no products match the search term display the following */}
          <div className="h-52 flex flex-col items-center shadow-md justify-center shadow-gray-300 bg-gray-50 ">
            <h1 className="text-2xl text-gray-800 font-semibold mb-4">
              No Orders available!
            </h1>
            <Link
              to="/home"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              START SHOPPING
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
