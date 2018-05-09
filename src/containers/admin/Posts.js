import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getAllPost, setEditPost} from "../../actions/postActionCreator";
import Navbar from "../public/Navbar";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment';
import {Link} from "react-router-dom";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            Header: 'Title',
            accessor: 'title'
        }, {
            Header: 'Kategori',
            accessor: 'category'
        }, {
            Header: 'Kayıt Zamanı',
            id: "timestamp",
            accessor: d => moment.unix(d.timestamp).format("MM/DD/YYYY").toString()
        }, {
            Header: 'Durum',
            id: "state",
            accessor: d => d.state === 1 ? 'Yayında' : 'Taslak'
        }, {
            Header: '',
            id: "slug",
            accessor: d => <div onClick={this.redirect.bind(this, d.slug)}>Düzenle</div>
        }]
    }

    componentDidMount() {
        this.props.getAllPost(this.props.user.uid);

    }

    redirect(slug) {
        if(this.props.post.hasOwnProperty('posts') && this.props.post.post.length > 0){
        this.props.post.posts.map((post) => {
            if(slug === post.slug){
                this.props.setEditPost(post);
                this.props.history.push('/admin/editpost/'+slug)
            }
        })
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className="col-12">
                        <ReactTable
                            data={(this.props.post.hasOwnProperty('posts') && this.props.post.post.length > 0) ? this.props.post.posts : []}
                            columns={this.columns}
                            defaultPageSize={10}
                            className="-striped -highlight mt-2 mb-2"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.post,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllPost,
        setEditPost
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);