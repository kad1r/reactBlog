import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {login, logout} from "../../actions/userActionCreator";

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);

    }



    onUsernameChange(event) {
        this.setState({username: event.target.value})
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value})
    }

    render() {
        this.props.user ? this.props.history.push('/admin/dashboard') :null;


        return (
            <form onSubmit={this.onSubmit}>
                <input
                    onChange={this.onUsernameChange}
                    type="text"
                    placeholder="Username"
                    name="email"
                />
                <input
                    onChange={this.onPasswordChange}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">
                    Sign Up
                </button>


            </form>
        );
    }
}
function mapStateToProps(state) {
    return {
        user:state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login, logout}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);