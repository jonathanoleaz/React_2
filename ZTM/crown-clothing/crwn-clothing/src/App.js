import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import { addCollectionAndDocuments, auth, createUserProfileDocument } from './firebase/firebase.utils';
import CheckoutPage from './pages/checkout/checkout.component';
//import './homepage.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInSingUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

import './App.css';

const App = ({ checkUserSession, currentUser }) =>  {

  /**we do not initialize the currentUser inside this component because now that is done through mapDispatchToProps function using redux */
  /*constructor(){
    super();

    this.state={
      currentUser: null
    }
  }*/

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  /*unsuscribeFromAuth=null;*/

  /**
   * Hooks update: now we will use 'useEefect method'
   * Once the component has mounted, this method is attached, which will detect the changes in auth state,
   * is a suscription between our application and firebase service.
   * Note that the 'onAuthStateChanged' function returns the unsuscribe function function for the observer (which allow us to stop that observer)
   
  componentDidMount(){

    //this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      /*this.setState({ currentUser: user });
      //createUserProfileDocument(user);
    //  if(userAuth){
    //    const userRef = await createUserProfileDocument(userAuth);

    //    userRef.onSnapshot(snapShot => {
    //      setCurrentUser({
    //        currentUser:{
    //          id: snapShot.id,
    //          ...snapShot.data()
    //        }
    //      })
    //    });
    //  }
    //  else{
    //    setCurrentUser(userAuth);
    //    /*addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}) ));
    //  }
    //});
    checkUserSession();
  }*/

  /* this method functions are not used anymore because wh unsuscribe directly from friebase.utils
  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }*/

  return(
    <div className="App">
      <Header /*currentUser={this.state.currentUser}*/ />     {/*we aren't passing the currentUser prop because the currentUser now is provided by redux using connect  */}
      
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' /> ) : (<SignInSingUpPage/>)} />
        </Switch>
      
    </div>
  )};

/**we are mapping each state props to component props 
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})*/
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

/**we are mapping each 'dispatching' function to component props */
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
