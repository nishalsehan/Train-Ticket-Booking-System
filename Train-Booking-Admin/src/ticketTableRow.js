import React, { Component } from 'react';


class ticketTableRow extends Component {

    constructor(props) {
        super(props);
        
    }

    

    render() { 
        return ( 
            <tr>
                <td>{this.props.obj._id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.from}</td>
                <td>{this.props.obj.to}</td>
                <td>{this.props.obj.time}</td>
                <td>{this.props.obj.fee}</td>
                <td>{this.props.obj.ticket_count}</td>
                </tr>
         );
    }
}
 
export default ticketTableRow;