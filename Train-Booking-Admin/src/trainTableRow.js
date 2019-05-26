import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class tableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(){
        axios.get('http://localhost:4000/train/delete/'+ this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
        
    }

    render() { 
        return ( 
            <tr>
                <td>{this.props.obj.train_id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.from}</td>
                <td>{this.props.obj.to}</td>
                <td>{this.props.obj.time}</td>
                <td><Link to={"/edit/"+this.props.obj._id} className="btn btn-warning btn-sm">Edit</Link>&nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.delete}>Delete</button></td>
            </tr>
         );
    }
}
 
export default tableRow;