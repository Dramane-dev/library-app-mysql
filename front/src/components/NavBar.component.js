import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fade from '@material-ui/core/Fade';

import AuthenticationService from '../services/authentication.service';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    
        this.state = {
          anchorEl: false
        };
    }

    handleOpenMenu(e) {
        this.setState({
          anchorEl: e.currentTarget
        });
    }
    
    handleCloseMenu(e) {
      this.setState({
        anchorEl: null
      });
    }
  
    redirectToAddNewBook() {
      window.location.href = '/book';
    }
  
    redirectToSignIn() {
      window.location.href = '/signin';
    }
  
    redirectToSignUp() {
      window.location.href = '/signup';
    }


    render() {
        const open = Boolean(this.state.anchorEl);
        
        return (
            <>
                { JSON.parse(localStorage.getItem('user')) ? 
                    (
                        <div className="top-bar">
                            <Link to={"/books"}>
                                <h1 className="title">Library App 📓</h1>
                            </Link>
                            { window.screen.width >= 280 && window.screen.height <= 812 ? (
                                <>
                                    <IconButton
                                     aria-label="more"
                                     aria-controls="long-menu"
                                     aria-haspopup="true"
                                     onClick={this.handleOpenMenu}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                     id="simple-menu"
                                     anchorEl={this.state.anchorEl}
                                     keepMounted
                                     open={ open }
                                     close={ this.handleCloseMenu.toString() }
                                     TransitionComponent={Fade}
                                    >
                                        <MenuItem 
                                         onClick={ this.handleCloseMenu }
                                        >
                                            <p 
                                             className="menu-items-buttons"
                                             onClick={ this.redirectToAddNewBook }
                                            >
                                                Add new book
                                            </p>
                                            </MenuItem>
                                        
                                            <MenuItem 
                                             onClick={ this.handleCloseMenu }
                                            >
                                            <p
                                             className="menu-items-buttons" 
                                             onClick={AuthenticationService.logout}
                                            >
                                                Log out
                                            </p>
                                        </MenuItem>
                                    </Menu>
                                </>
                                ) : (
                                    <>
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
                                    </>
                                )
                            }
                        </div>
                        ) : window.screen.width >= 280 && window.screen.height <= 812 ? (
                        <div className="top-bar">
                            <Link to={"/books"}>
                                <h1 className="title">Library App 📓</h1>
                            </Link>

                            <IconButton
                             aria-label="more"
                             aria-controls="long-menu"
                             aria-haspopup="true"
                             onClick={this.handleOpenMenu}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <Menu
                             id="simple-menu"
                             anchorEl={this.state.anchorEl}
                             keepMounted
                             open={ open }
                             close={ this.handleCloseMenu.toString() }
                             TransitionComponent={Fade}
                            >
                                <MenuItem 
                                 onClick={ this.handleCloseMenu }
                                >
                                <p 
                                className="menu-items-buttons"
                                 onClick={ this.redirectToSignIn }
                                >
                                    Sign In
                                </p>
                                </MenuItem>
                            
                                <MenuItem 
                                 onClick={ this.handleCloseMenu }
                                >
                                <p
                                className="menu-items-buttons" 
                                 onClick={ this.redirectToSignUp }
                                >
                                    Sign Up
                                </p>
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                    <div className="top-bar">
                        <Link to={"/books"}>
                        <h1 className="title">Library App 📓</h1>
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
            </>
        );
    }
}

