
import './App.css';
//import './homepage.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import {Switch, Route} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInSingUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth } from './firebase/firebase.utils';
import React from 'react';

class App extends React.Component {

  constructor(){
    super();

    this.state={
      currentUser: null
    }
  }

  unsuscribeFromAuth=null;

  /**
   * Once the component has mounted, this method is attached, which will detect the changes in auth state,
   * is a suscription between our application and firebase service.
   * Note that the 'onAuthStateChanged' function returns the unsuscribe function function for the observer (which allow us to stop that observer)
   */
  componentDidMount(){
    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log('x');
    });
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }


  render(){ 
    return(
    <div className="App">
      <Header currentUser={this.state.currentUser} />
      
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInSingUpPage} />
        </Switch>
      
    </div>
  )};
}

export default App;
