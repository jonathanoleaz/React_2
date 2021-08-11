import './App.css';
import React, {Component} from "react";
import {CardList} from "./components/card-list/card-list.component";
import {Searchbox} from "./components/search-box/search-box.component";

  class App extends Component{

    constructor(){
      super();
      this.state = {
        monsters: [],
        searchField: '',
        title: ''
      };

      /**
       * We define the context of the fuction 'handleChange' because the functions that arent overloaded, 
       * need to be defined an explicit context. This is not required if the function is and arrow function, for example, the followinf will work:
       * handleClick3 = () => console.log(this);
       * 
       * A rule in React is:
       * Use arrow functions on any class methods we define and aren't part of React (like render(), componentDidMount())
       */
      this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
    }


    handleChange(e){
      this.setState({ searchField: e.target.value,
        title: e.target.value });

    }

    
    render() {
      const { monsters, searchField, title } = this.state;
      /*const filteredMonsters = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchField.toLowerCase())
        )*/
      return (
        <div className="App">
          <h1>{title}</h1>
          <Searchbox
            placeholder="Search monsters"
            handleChange={this.handleChange}
          />
          <CardList monsters={monsters}/>
          
        </div>
      );
    }
  }


export default App;
