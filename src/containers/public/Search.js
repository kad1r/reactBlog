import React, {Component} from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    addPost,
    addTag,
    increaseTagCount,
    loadPostData, removePostData,
    removeTag,
    selectCategory, selectPostMode, setPostContent, setPostState, setPostTitle, updatePost
} from "../../actions/postActionCreator";
import moment from 'moment';
import {generateSlug} from "../../utils/utils";
import Navbar from "../public/Navbar";
import {uploadImage} from "../../firebase/firebase";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: this.props.match.params.searchQuery,
        };
    }
    componentDidMount(){
        this.setState({searchQuery: this.props.match.params.searchQuery})
    }
    getResult(searchQuery) {
        let finded = [];
        this.props.post.posts.map((post) => {
            if (post.content) {
                console.log(post.content.search(searchQuery))
                if (post.content.search(searchQuery) > -1) {
                    finded.push(post);
                } else {
                    if (post.title.search(searchQuery) > -1) {
                        finded.push(post);
                    }
                }

            }
        });
        console.log(finded)
    }

    render() {
        return (
            <div>
                {this.getResult(this.state.searchQuery)}
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
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);


