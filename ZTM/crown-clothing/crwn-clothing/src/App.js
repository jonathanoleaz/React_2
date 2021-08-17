
import './App.css';
//import './homepage.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import {Switch, Route} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInSingUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

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
      <Header /*currentUser={this.state.currentUser}*/ />     {/*we aren't apssing the currentUser prop because the currentUser now is provided by redux using connect  */}
      
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInSingUpPage} />
        </Switch>
      
    </div>
  )};
}

/**we are mapping each function to component props */
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
