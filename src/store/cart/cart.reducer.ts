import { AnyAction } from 'redux';

import { CartItem } from './cart.types';

import { setIsOpen, setCartItems } from './cart.actions';

export type CartState = {
  readonly isOpen: boolean;
  readonly cartItems: CartItem[];
};

const CART_INITIAL_STATES: CartState = {
  isOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATES,
  action = {} as AnyAction
) => {
  if (setIsOpen.match(action)) {
    return { ...state, isOpen: action.payload };
  }

  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  return state;
};
