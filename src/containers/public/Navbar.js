import React, { Component } from 'react';
import BookList from '../../components/book-list';
import BookDetail from '../../components/book_detail'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {login, logout} from "../../actions/userActionCreator";
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Container</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Link</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="/">Disabled</Link>
                            </li>
                            {
                                this.props.user ?
                            <li className="nav-item dropdown" onTouchStart={()=>alert('asd')}>
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown07"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown07">


                                            <Link className="dropdown-item" to="/admin/posts">Yazılar</Link>
                                    <Link className="dropdown-item" to="/admin/addpost">Yazı Ekle</Link>
                                            <Link className="dropdown-item" to="/admin/categories">Kategori Ekle</Link>
                                    <Link className="dropdown-item" onClick={()=>this.props.logout()} to="/">Çıkış Yap</Link>


                                </div>
                            </li> : null
                            }
                        </ul>
                        <form className="form-inline my-2 my-md-0">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login: login, logout:logout}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);