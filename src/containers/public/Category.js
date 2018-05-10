import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Post from "../../components/Post";
import Navbar from "./Navbar";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findedPosts:[],
            searchQuery: decodeURIComponent(this.props.match.params.categoryQuery),
        };
        console.log('category', this)
    }

    componentDidMount(){
        this.getResult(decodeURIComponent(this.props.match.params.categoryQuery))
    }


    getResult(categoryQuery) {
        let finded = [];
        this.props.post.posts.map((post) => {
            if (post.category) {
                if (post.category.search(categoryQuery) > -1) {
                    finded.push(post);
                }

            }
        });
        this.setState({findedPosts:finded})
    }

    getDerivedStateFromProps(nextProps, prevState){
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.match.params.categoryQuery !== nextProps.match.params.categoryQuery){
            this.getResult(decodeURIComponent(nextProps.match.params.categoryQuery))
        }

        return true;
    }

    render() {
        console.log( decodeURIComponent(this.props.match.params.categoryQuery.toLowerCase()))
        return (
            <div>
                <Navbar/>

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
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);


