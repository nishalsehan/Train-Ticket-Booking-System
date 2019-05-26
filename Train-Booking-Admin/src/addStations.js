import React , { Component} from 'react';
import { FormGroup,Button, Label,Input } from 'reactstrap';
import axios from 'axios';


class addStations extends Component{

    constructor(props){
      super(props);
      
      this.onChangeName = this.onChangeName.bind(this);
      
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {  
          name: '',
         
      }
    }

    onChangeName(e){ 
      this.setState({ 
          name: e.target.value 
      }) 
    }

    onSubmit(e){
      e.preventDefault();

      const obj = {
          name: this.state.name,
          
      };
      
      axios.post('http://localhost:4000/station/add', obj)
         .then(res => console.log(res.data));

      this.setState({
          name: '',
          
      })
  }
    
   
    render(){
        
        return (
          <div className="App Container">
            
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                  <Label for="exampleEmail">Station Name</Label>
                  <Input type="text" name="name" id="name" placeholder="Station Name" onChange={this.onChangeName} value={this.state.name}/>
              </FormGroup>
              

                <Button type="submit" className="btn btn-primary">Submit</Button>&nbsp;
                <Button type="reset" className="btn btn-warning">Clear</Button>
            </form>
            </div>
        );
      }
}

export default addStations;