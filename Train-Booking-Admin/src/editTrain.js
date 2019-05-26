import React , { Component} from 'react';
import { FormGroup,Button, Label,Input } from 'reactstrap';
import axios from 'axios';


class editTrains extends Component{

    constructor(props){
      super(props);
      
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeFrom = this.onChangeFrom.bind(this);
      this.onChangeTo = this.onChangeTo.bind(this);
      this.onChangeTime = this.onChangeTime.bind(this);
      this.onChangeFee = this.onChangeFee.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {  
          name: '',
          From: '',
          To:'',
          time:'',
          fee:'',
          stations:[12,4,1,5,6,2,7]
      }
    }

    onChangeName(e){ 
      this.setState({ 
          name: e.target.value 
      }) 
    }
    onChangeFrom(e){ 
        this.setState({ 
            From: e.target.value 
        }) 
    }
    onChangeTo(e){ 
        this.setState({ 
            To: e.target.value 
        }) 
    }
    onChangeTime(e){ 
        this.setState({ 
            time: e.target.value 
        }) 
    }
    onChangeFee(e){ 
        this.setState({ 
            fee: e.target.value 
        }) 
    }

    onSubmit(e){
        e.preventDefault();

        const obj = {
            name: this.state.name,
            from: this.state.From,
            to: this.state.To,
            time: this.state.time,
            fee: this.state.fee,
            route: this.state.stations

        };
        
        axios.post('http://localhost:4000/train/update', obj)
           .then(res => console.log(res.data));

        this.setState({
            name: '',
            From: '',
            To:'',
            time:'',
            fee:'',
            stations:[12,4,1,5,6,2,7]
        })
    }
    render(){
        
        return (
          <div className="App Container">
            <form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Train Name</Label>
                    <Input type="text" name="name" id="name" readOnly="readOnly" placeholder="Train name" onChange={this.onChangeName} value={this.state.name}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">From</Label>
                    <Input type="text" name="from" id="from" placeholder="From" onChange={this.onChangeFrom} value={this.state.From}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">To</Label>
                    <Input type="text" name="to" id="to" placeholder="To" onChange={this.onChangeTo} value={this.state.To}/>
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Time</Label>
                    <Input type="time" name="time" id="time" onChange={this.onChangeTime} value={this.state.time} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Fee</Label>
                    <Input type="fee" name="fee" id="fee" onChange={this.onChangeFee} value={this.state.fee} />
                </FormGroup>

                <Button type="submit" className="btn btn-primary">Submit</Button>&nbsp;
                <Button type="reset" className="btn btn-warning">Clear</Button>
            </form>
            </div>
        );
      }
}

export default editTrains;