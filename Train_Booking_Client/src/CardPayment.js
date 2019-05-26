import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './signup.css';

export default class AddCreditPayment extends Component {

    constructor(props) {

        super(props);

        if(sessionStorage.getItem('trainId')==''){
            this.props.history.push('/');
        }else if(sessionStorage.getItem('loggedIn')=='false'){
            this.props.history.push('/');
        }

        this.componentDidMount();

        this.onChangeCardName = this.onChangeCardName.bind(this);
        this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
        this.onChangeThreeDigit = this.onChangeThreeDigit.bind(this);
        this.onChangePass = this.onChangePass.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userMail:sessionStorage.getItem('UserName'),
            amount: 1500,
            discount:150,
            total:1350,
            cardName: '',
            cardNumber: '',
            threeDigit: '',
            


        }
    }

    componentDidMount() {

        if(sessionStorage.getItem('UserJob')=='gov'){
            this.setState({

                amount:sessionStorage.getItem('trainTicket')*sessionStorage.getItem('trainPax'),
                discount: sessionStorage.getItem('trainTicket')*sessionStorage.getItem('trainPax')/10.0,
                total: sessionStorage.getItem('trainTicket')*sessionStorage.getItem('trainPax')*(90/100)
            })
        }else{
            this.setState({

                amount:sessionStorage.getItem('trainTicket')*sessionStorage.getItem('trainPax'),
                discount: 0.0,
                total: sessionStorage.getItem('trainTicket')*sessionStorage.getItem('trainPax')
            })
        }
    }

    onChangeCardName(e) {
        this.setState({
            cardName: e.target.value
        });
    }

    onChangeCardNumber(e) {
        this.setState({
            cardNumber: e.target.value
        });
    }

    onChangeThreeDigit(e) {
        this.setState({
            threeDigit: e.target.value
        });
    }

    onChangePass(no) {
        const message = 'Train : '+sessionStorage.getItem('trainName')+'\n'+
        'From : '+sessionStorage.getItem('trainstart')+'\n'+
        'To : '+sessionStorage.getItem('trainend')+'\n'+
        'Total : ' + this.state.total+'\n'+
        'Date : '+ sessionStorage.getItem('traindate')+'\n'+
        'Time : '+ sessionStorage.getItem('traintime'); 
        confirmAlert({
            title: 'Successfully Tickets Booked',
              message: message,
              buttons: [
                {
                  label: 'Ok',
                  
                  onClick: () => this.props.history.push('/')
                  
                }
              ]
            
          });

    }
    
    

    onSubmit(e) {


        
           
        e.preventDefault();



        console.log(sessionStorage.getItem('trainId'));
        console.log(sessionStorage.getItem('UserName'));
        console.log(sessionStorage.getItem('tainstart'));
        console.log(sessionStorage.getItem('trainend'));
        console.log(sessionStorage.getItem('traintime'));

        const paymentObj = {
            ticket_id: sessionStorage.getItem('trainId'),
            userMail: sessionStorage.getItem('UserEmail'),
            amount: this.state.amount,
            discount: this.state.discount,
            total: this.state.total,
            cardName: this.state.cardName,
            cardNumber: this.state.cardNumber
            
        };

        axios.post('http://localhost:4000/cardPayment/add/', paymentObj)
        .then(res => {


            console.log(res.data);

            const ticketObj = {
                train_id: sessionStorage.getItem('trainId'),
                payment_id:res.data._id,
                name: sessionStorage.getItem('UserName'),
                from: sessionStorage.getItem('tainstart'),
                to: sessionStorage.getItem('trainend'),
                time: sessionStorage.getItem('traintime'),
                fee: this.state.total,
                payment_method: this.state.mobile,
                ticket_count: sessionStorage.getItem('trainPax'),
                date: sessionStorage.getItem('traindate')
    
            };
    
            axios.post('http://localhost:4000/tickets/add/', ticketObj)
            .then(res => {
                console.log(res.data);

                
                sessionStorage.setItem('trainId','');
                


                this.onChangePass();
                
            
                
            });
        });
    }
    render() {

        return (
            <div>
                <div className="card">

                    <div className="card-header">
                        <h3 className="card-title">{this.state.msg}</h3>
                    </div>

                    <div className="card-body">

                        <form class="form-signin" onSubmit={this.onSubmit}>

                            <center><h1 class="h3 mb-3 font-weight-normal">Make Credit Payment</h1></center>

                            <div className="form-group">
                                <label><b>Card Holder's Name : </b></label>
                                <input type="text" className="form-control" placeholder="Card Holder's Name " required value={this.state.cardName} onChange={this.onChangeCardName}/>
                            </div>

                            <div className="form-group">
                                <label><b>Card Number : </b></label>
                                <input type="number" className="form-control" placeholder="Card Number" required value={this.state.cardNumber} onChange={this.onChangeCardNumber}/>
                            </div>

                            <div className="form-group">
                                <label><b>CVC Number : </b></label>
                                <input type="number" className="form-control" placeholder="CVC Number" required value={this.state.threeDigit} onChange={this.onChangeThreeDigit}/>
                            </div>

                            <div className="form-group">
                                <label><b>Amount : </b></label><br />
                                <label><h4>{this.state.amount}</h4></label>
                            </div>

                            <div className="form-group">
                                <label><b>Discount : </b></label><br />
                                <label><h4>{this.state.discount}</h4></label>
                            </div>

                            <div className="form-group">
                                <label><b>Total : </b></label><br />
                                <label><h4>{this.state.total}</h4></label>
                            </div>
                            
                            <div class="form-group">
                                <input type="submit" value="Pay" className="btn btn-primary" />
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        )
    }
}