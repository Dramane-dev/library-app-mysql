import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';


class App extends Component {
  render() {
    return (
      <>
        <div className="top-bar">
          <Link to={"/books"}>
            <h1 className="title">Library App 📓</h1>
          </Link>
          <Link to={"/book"}>
            <p id="add-new-book" className="top-bar-buttons">Add new book</p>
          </Link>
          <div className="authentication-buttons">
          <Link to={"/signin"}>
            <p id="signin" className="top-bar-buttons">Sign In</p>
          </Link>
          <Link to={"/signup"}>
            <p id="signup" className="top-bar-buttons">Sign Up</p>
          </Link>
          </div>
        </div>

        <div id="not-logged" className="not-logged">
            <p>Could you <b>loggin</b></p>
            <p>To have an access into the Library App</p>
            <p>
              <span id="signin" class="signin">Sign In</span>
              or
              <span id="signup" class="signup">Sign Up</span>  
            </p>
        </div>
      </>
    );
  }
}

export default App;
