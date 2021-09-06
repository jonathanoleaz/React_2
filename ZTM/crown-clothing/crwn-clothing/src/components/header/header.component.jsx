import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../cart-icon/cart-icon.component';
import { HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer } from './header.styles';

import './header.styles.scss';

const Header = ( {currentUser, hidden} ) =>(
    <HeaderContainer>
        
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        
        <OptionsContainer>
            
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>

            {
                currentUser ? (
                <OptionDiv onClick={() => auth.signOut() }> SIGN OUT</OptionDiv>
                )
                : (
                <OptionLink to='/signin'>SIGN IN</OptionLink>
                )
            }
            <CartIcon/>
            
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown/>
        }
        
    </HeaderContainer>
);
 /**
  * 
  * in '({user: {currentUser}, cart: {hidden}})' we are destructuring the object "state"
  
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
})*/

/** using multiple state selectors first option 
const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
});*/

/** using multiple state selectors second option */
const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});


export default  connect(mapStateToProps)(Header);