import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const { products } = useContext(ProductContext);

  // Loop through all products and store the categories within the categories set
  const categories = new Set(
    products.map((product) => product.product_category)
  );

  //Change set into array
  const categoriesArray = Array.from(categories);

  const handleCategory = (category) => {
    //navigate to the search page and pass the searched input
    navigate("searched/" + category);
  };

  return (
    <div className=" overflow-x-auto md:overflow-x-hidden py-2">
      <div className="flex justify-center items-center md:justify-start md:p-4 p-1 md:my-4">
        {categoriesArray.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategory(category)}
            className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 md:px-2.5 p-2 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-primary-800 hover:text-white"
          >
            <span className="truncate ...">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
