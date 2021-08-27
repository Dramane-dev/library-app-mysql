import React, { Component } from 'react';
import {
  Switch, 
  Route
} from 'react-router-dom';

import ReactNotification from 'react-notifications-component';
import NavBar from './components/NavBar.component';
import Register from './components/Register.component';
import Books from './components/Books.component';
import Login from './components/Login.component';
import EditBook from './components/EditBook.component';
import Copyright from './components/Copyright.component';

import './App.css';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';

class App extends Component {
  render() {
    return (
      <>
       <div className="page-container">
        <div className="content">
          <ReactNotification />
          <NavBar />
          <Switch>
              <Route exact path={["/", "/books"]} component={Books} />
              <Route exact path="/signin" component={Login} />
              <Route exact path="/signup" component={Register} />
              <Route exact path="/book" component={EditBook} />
          </Switch>
        </div>
        <Copyright /> 
       </div>
      </>
    );
  }
}

export default App;
