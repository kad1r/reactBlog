import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {login, logout} from "../../actions/userActionCreator";
import {Link} from "react-router-dom";


const menuDATA = [
    {
        key: 1,
        link: '/test',
        title: 'title'
    },
    {
        key: 1,
        link: '/test',
        title: 'title',
        subItems: [
            {
                key: 2,
                link: '/test',
                title: 'title'
            },
            {
                key: 1,
                link: '/test',
                title: 'title'
            }
        ]
    },
]


class Navbar extends Component {


    MenuItem(data) {

    }

    dropdownSubItem(data) {
        return <Link key={data.key}
                     className="dropdown-item"
                     to={data.link}>{data.title}</Link>
    }

    dropdownItem() {

    }

    getMenu() {
        let menu;
        menuDATA.map((item)=>{
            if(item.hasOwnProperty('subItems')){

            }
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Ana Sayfa</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        <ul className="navbar-nav mr-auto">


                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>


                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown07"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Kategoriler</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown07">
                                    {
                                        this.props.post.categories.map((category) => {
                                            return <Link key={category}
                                                         className="dropdown-item"
                                                         to={"/category/" + category}>{category}</Link>
                                        })
                                    }


                                </div>

                            </li>


                            {
                                this.props.user ?
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="http://example.com"
                                           id="dropdown07"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User</a>
                                        <div className="dropdown-menu" aria-labelledby="dropdown07">

                                            <Link className="dropdown-item" to="/admin/posts">Yazılar</Link>
                                            <Link className="dropdown-item" to="/admin/addpost">Yazı Ekle</Link>
                                            <Link className="dropdown-item" to="/admin/categories">Kategori Ekle</Link>
                                            <Link className="dropdown-item" onClick={() => this.props.logout()} to="/">Çıkış
                                                Yap</Link>


                                        </div>
                                    </li> : null
                            }


                        </ul>
                        {/*<form className="form-inline my-2 my-md-0">
                            <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
                        </form>*/}
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        post: state.post
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login: login, logout: logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);