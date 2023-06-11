import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";

const AddToCart = ({ product, style, setHideButton }) => {
  const { addToCart } = useContext(CartContext);

  const { addedToCart } = useContext(ProductContext);

  const handleAddToCart = (product) => {
    //add product to cart
    addToCart(product);

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
