import { FC, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { CartItem } from '../../store/cart/cart.types';

import {
  CheckoutItemContainer,
  ImageContainer,
  Description,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  // For clarity, it is better to define the handlers outside the HTML (where we could define them as anonymous functions)
  const incrementItemHandler = () =>
    dispatch(addItemToCart(cartItems, cartItem));
  const decrementItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`}></img>
      </ImageContainer>
      <Description>{name}</Description>
      <Quantity>
        <Arrow onClick={decrementItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Description>{price}</Description>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
