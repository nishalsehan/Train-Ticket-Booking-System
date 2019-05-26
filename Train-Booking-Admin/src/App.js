import  React from 'react';

import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Create from './addTrains';
import AddStations from './addStations';
import viewStation from './viewStations';
import viewTrains from './viewTrains';
import viewTickets from './viewTickets';




function App() {
  return(
          <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                      <li className="nav-item active">
                        <Link to={'/'} className="nav-link">Home <span className="sr-only">(current)</span></Link>
                      </li>

                     

                      <li className="nav-item">
                        <Link to={'/create'} className="nav-link">Add Trains</Link>
                      </li>

                      <li className="nav-item">
                        <Link to={'/addStations'} className="nav-link">Add Stations</Link>
                      </li>

                      <li className="nav-item">
                        <Link to={'/viewTrain'} className="nav-link">View Trains</Link>
                      </li>

                      <li className="nav-item">
                        <Link to={'/viewStation'} className="nav-link">View Stations</Link>
                      </li>

                      <li className="nav-item">
                        <Link to={'/viewTicket'} className="nav-link">View Tickets</Link>
                      </li>

                    </ul>
                  </div>
                </nav> 

                <Switch>
                    <Route exact path='/create' component={Create}/>
                    <Route path='/viewTrain' component={viewTrains}/>
                    <Route path='/viewStation' component={viewStation}/>
                    <Route path='/viewTicket' component={viewTickets}/>
                    <Route path='/addStations' component={AddStations}/>
                    

                </Switch>   
            </div>
          </Router>
  );
  
}

export default App;
