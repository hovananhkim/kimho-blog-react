import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Logout extends Component {
    render() { 
        localStorage.removeItem('token');
        return ( 
            <Redirect exact to="/" />
         );
    }
}
 
export default Logout;