import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getAllPost} from "../../actions/postActionCreator";
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
        },{
            Header: 'Kategori',
            accessor: 'category'
        },{
            Header: 'Kayıt Zamanı',
            id: "timestamp",
            accessor: d => moment.unix(d.timestamp).format("MM/DD/YYYY").toString()
        },{
            Header: 'Durum',
            id: "state",
            accessor: d => d.state === 1 ? 'Yayında' : 'Taslak'
        },{
            Header: '',
            id: "slug",
            accessor: d => <div><Link to={'/admin/posts/' + d.slug}>Düzenle</Link></div>
        }]
    }

    componentDidMount() {
        this.props.getAllPost(this.props.user.uid);

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="row">
                    <div className="col-12">
                        <ReactTable
                            data={this.props.post.posts}
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
        getAllPost
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);