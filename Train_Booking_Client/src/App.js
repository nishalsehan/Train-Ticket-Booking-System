import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Footer from './footer';
import Navbar from './navbar';
import Signup from './signup';
import Login from './login';
import Landing from './landing';
import Search from './search';
import Logout from './logout';
import BookTicket from './bookTrain';
import PayMobile from './MobilePayment';
import PayCard from './CardPayment';



import Service from './service';
function App() {
  
  return (
    <Router>
        <div>
            <Navbar/>

            <Route exact path="/" component={Landing}/>

            <Route exact path="/" component={Search}/>

            
            
            <div className="newHomeContainer">
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
            </div>
            <Route exact path="/logout" component={Logout}/>


            <Route exact path="/bookTrain" component={BookTicket}/>
            <Route exact path="/payCard" component={PayCard}/>
            <Route exact path="/payMobile" component={PayMobile}/>
            <Route exact path="/" component={Service}/>
            <Footer/>
        </div>
    </Router>
  );
}

export default App;
