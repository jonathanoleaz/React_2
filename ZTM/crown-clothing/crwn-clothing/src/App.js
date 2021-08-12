
import './App.css';
//import './homepage.component';
import HomePage from './pages/homepage/homepage.component';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/shop/hats' component={HatsPage}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
