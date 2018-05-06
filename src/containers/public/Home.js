import React, {Component} from 'react';
import Posts from "./Posts";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <Posts/>
                        </div>
                        <div className="col-4">
                            <Sidebar/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Home;