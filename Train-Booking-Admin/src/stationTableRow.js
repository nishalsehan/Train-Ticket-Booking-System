import React, { Component } from 'react';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(){
        axios.get('http://localhost:4000/station/delete/'+ this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }

    render() { 
        return ( 
            <tr>
                <td>{this.props.obj.st_id}</td>
                <td>{this.props.obj.name}</td>
            </tr>
         );
    }
}
 
export default TableRow;