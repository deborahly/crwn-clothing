import CART_ACTION_TYPES from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setIsOpen = boolean => {
  console.log('running setIsOpen');
  return createAction(CART_ACTION_TYPES.SET_IS_OPEN, boolean);
};

// ADD ITEM TO CART
const addCartItem = (cartItems, productToAdd) => {
  const itemInCart = cartItems.find(item => item.id === productToAdd.id);

  // Return a new array, don't mutate the array received:
  if (itemInCart) {
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// REMOVE ITEM FROM CART
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // return back cart items with matching cart item with reduced quantity
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// CLEAR ITEM FROM CART
const clearCartItem = (cartItems, productToClear) =>
  cartItems.filter(item => item.id !== productToClear.id);

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
