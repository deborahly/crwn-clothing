import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingBag } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isOpen, setIsOpen, cartCount } = useContext(CartContext);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div className='cart-icon-container' onClick={toggleIsOpen}>
      <ShoppingBag className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
