import React, {Component} from 'react';
import Posts from "./Posts";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Post from "../../components/Post";
import Pagination from "./Pagination";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findedPosts:[],
            searchQuery: '',
            initialPage: 1,
            data: this.props.post.posts,
            pageOfItems: []
    };
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
        this.onSearchPress = this.onSearchPress.bind(this);
        this.onChangePage = this.onChangePage.bind(this);

    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }


    onSearchTextChange(e){
        this.setState({searchQuery:e.target.value});
    }

    onSearchPress(){
        console.log("secrh")
        this.props.history.push('/search/' + this.state.searchQuery)
    }
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





                            <div>
                                {
                                    this.state.pageOfItems.map((post) => {
                                        return <Post key={post.key}
                                                     id={post.slug}
                                                     title={post.title}
                                                     content={post.content}
                                                     footer={post.footer}/>
                                    })
                                }
                            </div>

                            <Pagination items={this.state.data} onChangePage={this.onChangePage} />





                        </div>
                        <div className="col-4">
                            <div className='mt-4 mb-4'>
                                <div className="row">
                                    <form onSubmit={this.onSearchPress}>

                                        <div className="input-group">
                                            <div className="col-9">
                                                <input type="text"
                                                       className="form-control"
                                                       placeholder="Arama yapın..."
                                                       value={this.state.searchQuery}
                                                       onChange={this.onSearchTextChange}/>
                                            </div>
                                            <div className="col-3">
                                                <div className="input-group-append">
                                                    <button className="btn btn-success"
                                                            type="submit"
                                                            onClick={()=> this.props.history.push('search/' + this.state.searchQuery)}>
                                                        Güncelle
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
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
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


