import React , { Component} from 'react';
import { Table } from 'reactstrap';
import TableRow from './stationTableRow';
import axios from 'axios';


class viewStation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stations: []
        };
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

    tableRow(){
        return this.state.stations.map(function(object, i){
            return <TableRow obj={object} key={i}/>
        });
    }
    render(){
        
        return (
          <div className="App Container">
          
            <br/><br/>
            
            <Table  id="myTable" >
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        
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

export default viewStation;