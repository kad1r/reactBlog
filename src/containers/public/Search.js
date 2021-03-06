import React, {Component} from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Post from "../../components/Post";
import Navbar from "./Navbar";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findedPosts:[],
            searchQuery: this.props.match.params.searchQuery.toLowerCase(),
        };
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
    }

    componentDidMount(){
        this.getResult(this.props.match.params.searchQuery.toLowerCase())
    }

    onSearchTextChange(e){
        this.setState({searchQuery:e.target.value});
        this.getResult(e.target.value)
    }

    getResult(searchQuery) {
        let finded = [];
        this.props.post.posts.map((post) => {
            if (post.content) {
                console.log(post.content.toLowerCase().search(searchQuery))
                if (post.content.search(searchQuery) > -1) {
                    finded.push(post);
                } else {
                    if (post.title.toLowerCase().search(searchQuery) > -1) {
                        finded.push(post);
                    }
                }

            }
        });
        this.setState({findedPosts:finded})
    }

    render() {
        return (
            <div>
                <Navbar/>
                <input type="text"
                       className="form-control mt-2 mb-4"
                       placeholder="Arama yapın..."
                       value={this.state.searchQuery}
                       onChange={this.onSearchTextChange}/>
                {
                    <div>
                        {
                            this.state.findedPosts ? this.state.findedPosts.map((post) => {
                                return <Post key={post.key}
                                             id={post.slug}
                                             title={post.title}
                                             content={post.content}
                                             footer={post.footer}/>
                            }) : null
                        }
                    </div>
                }
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


