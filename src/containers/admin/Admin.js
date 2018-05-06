import React, {Component} from 'react';
import * as firebase from 'firebase';
import {connect} from "react-redux";


class Admin extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        this.props.user ? this.props.history.push('/admin/dashboard') : this.props.history.push('/login');


        return (
            <div>
                Admin
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Admin);