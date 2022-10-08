import { useSelector, useDispatch } from 'react-redux';
import { setIsOpen } from '../../store/cart/cart.actions';
import { selectIsOpen, selectCartCount } from '../../store/cart/cart.selectors';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const isOpen = useSelector(selectIsOpen);
  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();

  const toggleIsOpen = () => dispatch(setIsOpen(!isOpen));

  return (
    <CartIconContainer onClick={toggleIsOpen}>
      <ShoppingIcon className='shopping-icon  ' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
