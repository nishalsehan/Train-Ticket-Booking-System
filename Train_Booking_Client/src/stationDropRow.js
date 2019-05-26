import React, { Component } from 'react';

class TableRow extends Component {
    constructor(props) {
        super(props);
        
    }

    

    render() { 
        return ( 
            <option value={this.props.obj.name}>{this.props.obj.name}</option>
            
         );
    }
}
 
export default TableRow;