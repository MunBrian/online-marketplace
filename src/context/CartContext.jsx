import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevState) => [...prevState, product]);

    const updatedItems = [...cart, product];

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => item.$id !== id);

    setCart(newCart);

    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  //   console.log(typeof cart);

  useEffect(() => {
    //get items in local storage
    const items = JSON.parse(localStorage.getItem("cartItems"));

    if (!items) {
      setCart([]);
    } else {
      //set item in state
      setCart(items);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
