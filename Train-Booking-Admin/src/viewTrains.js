import React , { Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import TableRow from './trainTableRow';


class viewTrains extends Component{

    constructor(props) {
        super(props);
        this.state = {
            trains: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/train')
            .then(response => {
                this.setState({ trains: response.data });
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    tableRow(){
        return this.state.trains.map(function(object, i){
            return <TableRow obj={object} key={i}/>
        });
    }
    render(){
        
        return (
          <div className="App Container">
            
            
            <Table id="myTable">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>From</td>
                        <td>To</td>
                        <td>Time</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    
                   
                    { this.tableRow() }
                    
                </tbody>
            </Table>
          </div>
        );
      }
}

export default viewTrains;