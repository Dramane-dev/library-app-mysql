import React, { Component } from 'react';
import {
  Switch, 
  Route, 
  Link 
} from 'react-router-dom';
import Register from './components/Register.component';
import Books from './components/Books.component';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
  }

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
                <p id="signin" className="top-bar-buttons signin">Sign In</p>
              </Link>
              <Link to={"/signup"}>
                <p id="signup" className="top-bar-buttons signup">Sign Up</p>
              </Link>
            </div>
          </div>

          <Switch>
              <Route exact path={["/", "/books"]} component={Books} />
              {/* <Route exact path="/login" component={} /> */}
              <Route exact path="/signup" component={Register} />
              {/* <Route exact path="/book" component={} /> */}
          </Switch>
      </>
    );
  }
}

export default App;
