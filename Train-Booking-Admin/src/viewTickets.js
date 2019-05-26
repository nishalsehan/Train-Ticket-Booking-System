import React , { Component} from 'react';
import { Table } from 'reactstrap';
import TableRow from './ticketTableRow';
import axios from 'axios';

class viewTickets extends Component{


    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/tickets')
            .then(response => {
                this.setState({ tickets: response.data });
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    tableRow(){
        return this.state.tickets.map(function(object, i){
            return <TableRow obj={object} key={i}/>
        });
    }
    render(){
        
        return (
          <div className="App Container">
            
            <br/><br/>
            
            <Table id="myTable">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>From</td>
                        <td>To</td>
                        <td>Time</td>
                        <td>Total</td>
                        <td>Pax</td>
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

export default viewTickets;