import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';



class navbar extends Component {
    
    onLogoutClick(e){ 
        this.setState({ 
            
            
        }) 
      }
    render() {
        return (
            <div>
                <header>
                    
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a class="navbar-brand" href="#">
                            <img src="image/white-logo.png" width="190" height="50" class="d-inline-block align-top" />
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                            <div class="nav navbar-nav navbar-right">
                                <Link to="/" class="nav-item nav-link active">Home</Link>
                                {sessionStorage.getItem('loggedIn')=='false' &&
                                    
                                    <Link to="/signup" class="nav-item nav-link">Signup</Link>
                                    
                                }
                                {sessionStorage.getItem('loggedIn')=='false' &&
                                    
                                    <Link to="/login" class="nav-item nav-link">Login</Link>
                                    
                                }
                                {sessionStorage.getItem('loggedIn')=='true' &&
                                    <div>
                                    <a class="nav-item nav-link">Hello {sessionStorage.getItem('UserName')}</a>
                                        
                                    </div>
                                }
                                {sessionStorage.getItem('loggedIn')=='true' &&
                                    <div>
                                    <Link to="/logout" class="nav-item nav-link">Logout</Link>
                                        
                                    </div>
                                }
                                        
                            </div>
                        </div>
                    </nav>
                    

                        
                </header>

                
            </div>
        );
    }
}

export default navbar;
