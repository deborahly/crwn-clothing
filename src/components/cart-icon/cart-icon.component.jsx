import { useSelector, useDispatch } from 'react-redux';
import { setIsOpen } from '../../store/cart/cart.actions';
import { selectIsOpen, selectCartCount } from '../../store/cart/cart.selectors';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const isOpen = useSelector(selectIsOpen);
  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();

  const toggleIsOpen = () => dispatch(setIsOpen(!isOpen));

  return (
    <CartIconContainer onClick={toggleIsOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
