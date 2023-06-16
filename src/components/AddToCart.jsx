import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCart = ({ product, style, setHideButton }) => {
  const { addToCart } = useContext(CartContext);

  const { addedToCart } = useContext(ProductContext);

  const handleAddToCart = (product) => {
    //add product to cart
    addToCart(product);

    toast.success("Product was successful added to cart.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    //set product id to addedToCart
    addedToCart(product.$id);

    setHideButton(true);
  };

  return (
    <button
      onClick={() => handleAddToCart(product, setHideButton)}
      className={style}
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
