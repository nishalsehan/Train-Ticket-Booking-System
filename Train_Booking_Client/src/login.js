
import React, { Component } from 'react';
import './signup.css';
import axios from 'axios';


class login extends Component {


    constructor(props){
        super(props);
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {  
            email: '',
            password: '',
            msg:''
            
        }
      }
  
      onChangeEmail(e){ 
        this.setState({ 
            email: e.target.value 
        }) 
      }
      onChangePassword(e){ 
          this.setState({ 
              password: e.target.value 
          }) 
      }


    onSubmit(e){
        e.preventDefault();

        const obj = {
            email: this.state.email,
            password: this.state.password

        };
        console.log(this.state.email);
        console.log(this.state.password);

        axios.post('http://localhost:4000/user/login', obj)
           .then(result => {


            let UserData=result.data;

            console.log(UserData);
            console.log('id '+UserData._id);
            console.log('email '+UserData.email);
            console.log('password '+UserData.password);
            console.log('password '+UserData.password);



                sessionStorage.setItem('loggedIn','true');
                sessionStorage.setItem('UserID',UserData._id);
                sessionStorage.setItem('UserName',UserData.name);
                sessionStorage.setItem('UserJob',UserData.job_status);
                sessionStorage.setItem('UserEmail',UserData.email);
                sessionStorage.setItem('UserNIC',UserData.nic);
                sessionStorage.setItem('UserPassword',UserData.password);
                sessionStorage.setItem('job',UserData.job_status);


                this.setState({
                    email: '',
                    password: '',
                    msg: 'Enter Your Credentials'
                });

                let{history} = this.props;
                history.push({
                    pathname:'/',
                    state: {detail : UserData}
                });
                window.location.reload();

            

            //this.props.history.push('/');


        }).catch(error => {
            console.log(error);
            this.setState({
                msg: 'Invalid Credentials'
            });
        });

        this.setState({
            email:'',
            password:''
        })
    }
    render() {
        return (
            <div>
                
                <div className="card">
                
                    <div className="card-body">
                    
                        <form class="form-signin" onSubmit={this.onSubmit}>
                        
                            <center><h1 class="h3 mb-3 font-weight-normal">Start Your Session</h1></center>
                            
                            <div className="form-group" >
                                <label>{this.state.msg}</label>

                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeEmail} value={this.state.email}/>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangePassword} value={this.state.password}/>
                            </div>

                            <div class="checkbox mb-3">
                                <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                            
                        </form>
                    </div>
                </div>
						
            </div>
        );
    }
}

export default login;
