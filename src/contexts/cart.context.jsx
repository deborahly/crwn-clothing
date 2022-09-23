import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const itemInCart = cartItems.find(item => item.id === productToAdd.id);
  console.log(itemInCart);

  // Return a new array, don't mutate the array received:
  if (itemInCart) {
    const newCartItems = cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    return newCartItems;
  }
  console.log([...cartItems, { ...productToAdd, quantity: 1 }]);
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isOpen, setIsOpen, cartItems, addItemToCart, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
