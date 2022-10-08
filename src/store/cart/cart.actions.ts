import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';

// AUXILIARY FUNCTIONS
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const itemInCart =
    cartItems && cartItems.find(item => item.id === productToAdd.id);

  // Return a new array, don't mutate the array received:
  if (itemInCart) {
    return cartItems.map(item =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return cartItems
    ? [...cartItems, { ...productToAdd, quantity: 1 }]
    : cartItems;
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  // find the cart item to remove
  const existingCartItem =
    cartItems &&
    cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // return back cart items with matching cart item with reduced quantity
  if (cartItems) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  return cartItems;
};

const clearCartItem = (
  cartItems: CartItem[],
  productToClear: CartItem
): CartItem[] => cartItems ? cartItems.filter(item => item.id !== productToClear.id): cartItems;

// FUNCTION TYPES
export type SetIsOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

// EXPORT FUNCTIONS
export const setIsOpen = withMatcher(
  (boolean: boolean): SetIsOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_OPEN, boolean)
);

export const setCartItems = withMatcher((cartItems: CartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = withMatcher(
  (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    return setCartItems(newCartItems);
  }
);

export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);

    return setCartItems(newCartItems);
  }
);

export const clearItemFromCart = withMatcher(
  (cartItems: CartItem[], productToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, productToClear);

    return setCartItems(newCartItems);
  }
);
