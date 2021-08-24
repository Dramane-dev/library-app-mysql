import React, { Component } from 'react';
import {
  Switch, 
  Route, 
  Link 
} from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import Register from './components/Register.component';
import Books from './components/Books.component';
import Login from './components/Login.component';

import AuthenticationService from './services/authentication.service';

import './App.css';
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';
class App extends Component {
  render() {
    return (
      <>
        <ReactNotification />
        {JSON.parse(localStorage.getItem('user')) ? 
          (
            <div className="top-bar">
              <Link to={"/books"}>
                <h1 className="title">Library App 📓</h1>
              </Link>
              <Link to={"/book"}>
                <p id="add-new-book" className="top-bar-buttons">Add new book</p>
              </Link>
              <div className="authentication-buttons">
                <Link to={"/"}>
                  <p 
                    id="logout" 
                    className="top-bar-buttons logout" 
                    onClick={AuthenticationService.logout}
                    >
                      Log out
                  </p>
                </Link>
              </div>
            </div>
          ) : (
              <div className="top-bar">
                <Link to={"/books"}>
                  <h1 className="title">Library App 📓</h1>
                </Link>
                <Link to={"/book"}>
                  <p id="add-new-book" className="top-bar-buttons">Add new book</p>
                </Link>
                <div className="authentication-buttons">
                  <Link to={"/signin"}>
                    <p id="signin" className="top-bar-buttons signin">Sign In</p>
                  </Link>
                  <Link to={"/signup"}>
                    <p id="signup" className="top-bar-buttons signup">Sign Up</p>
                  </Link>
                </div>
            </div>
          )
        }
        <Switch>
            <Route exact path={["/", "/books"]} component={Books} />
            <Route exact path="/signin" component={Login} />
            <Route exact path="/signup" component={Register} />
            {/* <Route exact path="/book" component={} /> */}
        </Switch>
      </>
    );
  }
}

export default App;
