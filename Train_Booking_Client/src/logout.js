import React,{Component} from 'react';

export default class Logout extends Component{

    render(){
        sessionStorage.setItem('loggedIn','false');
        sessionStorage.removeItem('UserToken');
        sessionStorage.removeItem('UserID');
        sessionStorage.removeItem('UserEmail');
        sessionStorage.removeItem('UserPassword');
        sessionStorage.removeItem('UserType');

        let{history} = this.props;
        history.push({
            pathname:'/',
        });
        window.location.reload();
        return(
            <div></div>
        );
    }
}