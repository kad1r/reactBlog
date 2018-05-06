import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Navbar from "../public/Navbar";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className='row'>
                    <div className='col-12'>
                        Dashboard
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;