import React, { Component } from 'react';

class home extends Component {
    render() {
        return (
            <div>
                 <div class="newHomeContainer">
                    <div class="centered">
                        <input type="text" class="form-control   "  id="trackId" placeholder="Type Your Tracking ID Here" autocomplete="off"/>
                        <button class="btn   " id="trackBtn">Track</button>
                        <div id="alertText"></div>
                        <div class="text-center    centerIcons hidden-sm hidden-xs" >
                            <div class="col-md-4">
                            <a href="request-pickup.html" class="btn btn-round">
                                <img src="icons/index/icon1.png" alt="pickuo icon" class="titlebarIcon" /><br/>
                                <span class="fa fa-truck"></span><br/> 
                            </a><br/>
                            Pick up
                            </div>

                        <div class="col-md-4">
                            <a  href="request-rate.html" class="btn btn-round btn-round-orange">
                            <img src="icons/index/icon23.png" alt="Rates icon" class="titlebarIcon" /><br/>
                            <span class="fa fa-money"></span><br/> 
                            </a>
                            <br/>
                            Rates
                        </div>

                        <div class="col-md-4">
                            <a href="locations.html" class="btn btn-round">
                            <img src="icons/index/icon3.png" alt="location icon" class="titlebarIcon" /><br/>
                            <span class="fa fa-map-marker"></span><br/> 
                            </a><br/>
                            Visit us
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default home;
