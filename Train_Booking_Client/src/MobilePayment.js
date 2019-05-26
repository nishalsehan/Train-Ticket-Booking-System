import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './signup.css';

export default class AddMobilePayment extends Component {

    constructor(props) {

        super(props);


        if(sessionStorage.getItem('trainId')==''){
            this.props.history.push('/');
        }else if(sessionStorage.getItem('loggedIn')=='false'){
            this.props.history.push('/');
        }

        this.componentDidMount();

        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeFourDigit = this.onChangeFourDigit.bind(this);
        this.onChangePass = this.onChangePass.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            
            amount:  '',
            discount: '',
            total: '',
            mobile: '',
            fourDigit: '',
            msg: ''


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

    onChangeMobile(e) {
        this.setState({
            mobile: e.target.value
        });
    }

    onChangeFourDigit(e) {
        this.setState({
            fourDigit: e.target.value
        });
    }


    onChangePass() {
        const message = 'Train : '+sessionStorage.getItem('trainName')+
        '\nFrom : '+sessionStorage.getItem('trainstart')+
        '\nTo : '+sessionStorage.getItem('trainend')+
        '\nTotal : ' + this.state.total+
        '\nDate : '+ sessionStorage.getItem('traindate')+
        '\nTime : '+ sessionStorage.getItem('traintime'); 
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
            ticketId: sessionStorage.getItem('trainId'),
            userMail: sessionStorage.getItem('UserEmail'),
            amount: this.state.amount,
            discount: this.state.discount,
            total: this.state.total,
            mobileNo: this.state.mobile,
            userName:sessionStorage.getItem('UserName')
            
        };

        axios.post('http://localhost:4000/mobilePayment/add/', paymentObj)
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
            .then(
                res => {
                    console.log(res.data)
                    
                    sessionStorage.setItem('trainId','');
                    
                    this.onChangePass();
            }
            );
        });
    }

    render() {

        return (
            <div>

                <div className="card">
                    <div className="card-body">
                        
                        <form onSubmit={this.onSubmit} class="form-signin">

                            <center><h1 class="h3 mb-3 font-weight-normal">Make Mobile Payment</h1></center>

                            <div className="form-group">
                                <label><b>Mobile Number : </b></label>
                                <input type="text" className="form-control" placeholder="Mobile Number" required value={this.state.mobile} onChange={this.onChangeMobile}/>
                            </div>

                            <div className="form-group">
                                <label><b>Four Digit Number : </b></label>
                                <input type="text" className="form-control" placeholder="Four Digit Number" required value={this.state.fourDigit} onChange={this.onChangeFourDigit} />
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
                            


                            <div className="form-group">
                                <input type="submit" value="Pay" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}