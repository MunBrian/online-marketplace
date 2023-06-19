import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductItem = ({ product }) => {
  return (
    <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={"/home/product-detail/" + product.$id}>
        <img
          className="rounded-t-lg object-cover md:h-48 h-28 w-full hover:scale-105"
          src={product.product_pic}
          alt="product image"
        />
      </Link>
      <div className=" mt-2 ">
        <Link to={"/home/product-detail/" + product.$id}>
          <h5 className="md:text-xl whitespace-nowrap truncate ... text-base font-semibold tracking-tight text-gray-900 dark:text-white md:mb-3 mt-2.5 mb-2">
            {product.product_name}
          </h5>
        </Link>
        <div className="md:flex md:justify-between md:items-center ">
          <span className="md:text-3xl block text-lg font-bold text-gray-900 dark:text-white">
            ${product.product_price}
          </span>
          <AddToCart
            product={product}
            style={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
