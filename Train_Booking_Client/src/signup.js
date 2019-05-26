
import React, { Component } from 'react';
import './signup.css'
import axios from 'axios';



class signup extends Component {



    constructor(props){
        super(props);
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCPassword = this.onChangeCPassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onChangeJob = this.onChangeJob.bind(this);
        this.onChangeTeleNo = this.onChangeTeleNo.bind(this);


        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {  
            email: '',
            password: '',
            nic:'',
            job:'',
            cPassword:'',
            name:'',
            teleNo:''
            
        }
      }

      onChangeName(e){ 
        this.setState({ 
            name: e.target.value 
        }) 
      }

      onChangeEmail(e){ 
        this.setState({ 
            email: e.target.value 
        }) 
      }

      onChangeTeleNo(e){ 
        this.setState({ 
            teleNo: e.target.value 
        }) 
      }

      onChangeJob(e){ 
        this.setState({ 
            job: e.target.value 
        }) 
      }

      onChangeNIC(e){ 
        this.setState({ 
            nic: e.target.value 
        }) 
      }

      onChangePassword(e){ 
        this.setState({ 
            password: e.target.value 
        }) 
      }

      onChangeCPassword(e){ 
        this.setState({ 
            cPassword: e.target.value 
        }) 
      }

    onSubmit(e){
        e.preventDefault();

        const obj = {
            name: this.state.name,
            teleno: this.state.teleNo,
            email: this.state.email,
            job_status: this.state.job,
            nic: this.state.nic,
            password: this.state.password

        };
        
        if(this.statecPassword === this.statepassword){
            axios.post('http://localhost:4000/user/add', obj)
            .then(data => {
                console.log(data);
                
            }).catch(err=>{
                 console.log("fail");  
            });
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
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control"  aria-describedby="emailHelp" onChange={this.onChangeName} value={this.state.name}/>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Phone Number</label>
                                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeTeleNo} value={this.state.teleNo}/>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeEmail} value={this.state.email}/>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Job Status</label>
                                <select className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeJob} value={this.state.job}>
                                    <option value="">Select the job status</option>
                                    <option value="gov">Goverment</option>
                                    <option value="non_gov">Non-Goverment</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">ID number</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeNIC} value={this.state.nic}/>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Password</label>
                                <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangePassword} value={this.state.password}/>
                            </div>

                            <div className="form-group">
                                <label for="exampleInputEmail1">Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeCPassword} value={this.state.cPassword}/>
                            </div>

                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default signup;
