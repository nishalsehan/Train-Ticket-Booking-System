
import React, { Component } from 'react';
import './landing.css'

class landing extends Component {
    render() {
        return (
            <div>
                
                 <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class=""></li>
      <li data-target="#myCarousel" data-slide-to="1" class=""></li>
      <li data-target="#myCarousel" data-slide-to="2" class=""></li>
      <li data-target="#myCarousel" data-slide-to="3" class="active"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item">
        <img src="image/01.jpg" class="bd-placeholder-img" width="100%" height="100%" /><rect width="100%" height="100%" fill="#777"></rect>
        <div class="container">
          <div class="carousel-caption text-left">
            <h1>Example headline.</h1>
            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
           
          </div>
        </div>
      </div>
      <div class="carousel-item">
      <img src="image/02.jpg" class="bd-placeholder-img" width="100%" height="100%" /><rect width="100%" height="100%" fill="#777"></rect>        <div class="container">
          <div class="carousel-caption">
            <h1>Another example headline.</h1>
            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          </div>
        </div>
      </div>
      <div class="carousel-item active">
      <img src="image/sl.jpg" class="bd-placeholder-img" width="100%" height="100%" /><rect width="100%" height="100%" fill="#777"></rect>        <div class="container">
          <div class="carousel-caption text-right">
            <h1>One more for good measure.</h1>
            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            
          </div>
        </div>
      </div>
      <div class="carousel-item">
      <img src="image/home.png" class="bd-placeholder-img" width="100%" height="100%" /><rect width="100%" height="100%" fill="#777"></rect>        <div class="container">
          <div class="carousel-caption text-right">
            <h1>One more for good measure.</h1>
            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            
          </div>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
            </div>
        );
    }
}

export default landing;
