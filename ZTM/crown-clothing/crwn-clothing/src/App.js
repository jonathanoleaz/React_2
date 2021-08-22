import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import CheckoutPage from './pages/checkout/checkout.component';
//import './homepage.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSingUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';

class App extends React.Component {

  /**we do not initialize the currentUser inside this component because now that is done through mapDispatchToProps function using redux */
  /*constructor(){
    super();

    this.state={
      currentUser: null
    }
  }*/

  unsuscribeFromAuth=null;

  /**
   * Once the component has mounted, this method is attached, which will detect the changes in auth state,
   * is a suscription between our application and firebase service.
   * Note that the 'onAuthStateChanged' function returns the unsuscribe function function for the observer (which allow us to stop that observer)
   */
  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      /*this.setState({ currentUser: user });*/
      //createUserProfileDocument(user);
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
      }
      else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }


  render(){ 
    return(
    <div className="App">
      <Header /*currentUser={this.state.currentUser}*/ />     {/*we aren't passing the currentUser prop because the currentUser now is provided by redux using connect  */}
      
        <Switch>
          <Route exact path='/'         component={HomePage}/>
          <Route exact path='/shop'     component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' /> ) : (<SignInSingUpPage/>)} />
        </Switch>
      
    </div>
  )};
}
/**we are mapping each state props to component props 
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})*/
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

/**we are mapping each 'dispatching' function to component props */
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
