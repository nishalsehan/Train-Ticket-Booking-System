import React, { Component } from 'react';
import './search.css';
import axios from 'axios';
import DropDown from './stationDropRow';

class search extends Component {

   constructor(props){
      super(props);
      
      this.onChangeStart = this.onChangeStart.bind(this);
      this.onChangeEnd = this.onChangeEnd.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeTime = this.onChangeTime.bind(this);
      

      this.onSubmit = this.onSubmit.bind(this);

      this.state = {  
          start: '',
          end: '',
          date:'',
          time:'',
          stations: [],
          msg:''
          
          
      }
    }

    componentDidMount() {
      axios.get('http://localhost:4000/station')
          .then(response => {
              this.setState({ stations: response.data });
          })
          .catch(function(error) {
              console.log(error)
          })
  }

   dropdownRow(){
         return this.state.stations.map(function(object, i){
            return <DropDown obj={object} key={i}/>
         });
   }
    onChangeStart(e){ 
      this.setState({ 
          start: e.target.value 
          
      }) 
      console.log(e.target.value);
    }

    onChangeEnd(e){ 
      this.setState({ 
          end: e.target.value 
      }) 
    }

    onChangeDate(e){ 
      this.setState({ 
          date: e.target.value 
      }) 
    }

    onChangeTime(e){ 
      this.setState({ 
          time: e.target.value 
      }) 
    }

    

  onSubmit(e){
      e.preventDefault();

      if(sessionStorage.getItem('loggedIn')=='true'){

         const obj = {
            start: this.state.start,
            end: this.state.end
   
        };
        console.log(this.state.start);
        console.log(this.state.end);
   
        axios.post('http://localhost:4000/train/book', obj)
           .then(result => {
   
   
            
   
            console.log("train found");
            sessionStorage.setItem('trainstart',this.state.start);
            sessionStorage.setItem('trainend',this.state.end);
            sessionStorage.setItem('traindate',this.state.date);
            sessionStorage.setItem('traintime',this.state.time);
            sessionStorage.setItem('trainId',result.data.train_id);
            sessionStorage.setItem('trainName',result.data.name);
            sessionStorage.setItem('trainTicket',result.data.fee);
   
   
   
   
            this.props.history.push('/bookTrain');
   
        }).catch(error => {
            console.log(error);
            this.setState({ 
               msg: "No train found"            
           })
        });
      }else{
         this.props.history.push('/login');
      }
   
      

     
      
  }
    render() {
        return (     
            <div>
                <div class="flight-engine">
               <div class="container">
                  <div class="tabing">
                    
                     <div class="tab-content">
                        <div id="1" class="tab1 active">
                           
                        <form  onSubmit={this.onSubmit}>
                        <div className="form-group" >
                                <label>{this.state.msg}</label>

                            </div>
                           <div class="flight-tab row">
                           
                              <div class="persent-one">
                                 <i class="fa fa-map-marker" aria-hidden="true"></i>
                                 <select name="dep" class="textboxstyle" id="dep" required placeholder="From City or station" onChange={this.onChangeStart} value={this.state.start}>
                                 <option selected>Select the Station</option>
                                 { this.dropdownRow() }
                                 </select>
                              </div>
                              <div class="persent-one">
                                 <i class="fa fa-map-marker" aria-hidden="true"></i>
                                 <select name="dep" class="textboxstyle" id="arival" required placeholder="To City or station" onChange={this.onChangeEnd} value={this.state.end}>
                                 <option selected>Select the Station</option>

                                    { this.dropdownRow() }
                                 </select>
                              </div>
                              <div class="persent-one less-per">
                                 <i class="fa fa-calendar" aria-hidden="true"></i>
                                 <input type="date" name="dep" class="textboxstyle" required id="from-date1" placeholder="Depart" onChange={this.onChangeDate} value={this.state.date}/>
                              </div>
                              <div class="persent-one less-per">
                                 <i class="fa fa-calendar" aria-hidden="true"></i>
                                 <input type="time" name="dep" class="textboxstyle" required id="to-time" placeholder="Time" onChange={this.onChangeTime} value={this.state.time}/>
                              </div>
                              
                              <div class="persent-one less-btn">
                                 <input type="Submit" name="submit" value="Search" class="btn btn-primary" id="srch"/>
                              </div>
                              
                           </div>
                           </form>
                        </div>
                       
                         
                        
                     </div>
                     </div>
                     
                  </div>
                 
               </div>
            </div>
            
          );
    }
}

export default search;