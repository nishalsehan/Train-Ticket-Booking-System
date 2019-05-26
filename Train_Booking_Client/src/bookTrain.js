import React, { Component } from 'react';
import './signup.css'
import axios from 'axios';



class trainBook extends Component {



    constructor(props){
        super(props);
        
        if(sessionStorage.getItem('trainId')==''){
            this.props.history.push('/');
        }else if(sessionStorage.getItem('loggedIn')=='false'){
            this.props.history.push('/');
        }

        this.onChangePayment = this.onChangePayment.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {  

            
            payment_method:'',
            ticket_count:'',
            train:sessionStorage.getItem('trainName')
        }
      }

      

     

      onChangePayment(e){ 
        this.setState({ 
            payment_method: e.target.value 
        }) 
      }

      onChangeCount(e){ 
        this.setState({ 
            ticket_count: e.target.value 
        }) 
      }

      

      

    onSubmit(e){
        e.preventDefault();

         sessionStorage.setItem('trainPax',this.state.ticket_count);
         console.log(this.state.payment_method);
         
         if(this.state.payment_method == 'card'){
            this.props.history.push('/payCard');

         }else if(this.state.payment_method == 'mobile'){
            this.props.history.push('/payMobile');

         }
        
            
        
        

        
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <form className="form-signin"  onSubmit={this.onSubmit}>
                            <center><h1 className="h3 mb-3 font-weight-normal">Start Your Session</h1></center>
                            
                            <div className="form-group">
                                <label for="exampleInputEmail1">Train</label>
                                <input type="text" readOnly="readOnly" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeTrain} value={this.state.train}/>

                                
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Ticket Count</label>
                                <input type="number" className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeCount} value={this.state.ticket_count}/>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Payment Method</label>
                                <select className="form-control"  aria-describedby="emailHelp" onChange={this.onChangePayment} value={this.state.payment_method}>
                                <option >Select Payment method</option>

                                <option value="card">Card</option>
                                <option value="mobile">Mobile</option>
                                </select>                            
                            </div>

                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default trainBook;
