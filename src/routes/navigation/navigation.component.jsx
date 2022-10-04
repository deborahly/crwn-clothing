import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { selectIsOpen } from '../../store/cart/cart.selectors';
import { signOutStart } from '../../store/user/user.actions';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isOpen = useSelector(selectIsOpen);
  const dispatch = useDispatch();

  const signOutHandle = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutHandle}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}

          <CartIcon />
        </NavLinks>
        {isOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
