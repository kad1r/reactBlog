import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Post extends Component {

    getPostContent(post){


       return post.replace(/<(?:.|\n)*?>/gm, '');


    }

    render() {
        this.content = this.props.content ? this.getPostContent(this.props.content) : null;
        console.log('this.content', typeof this.content)

        return (
            <div className="card mt-4 mb-4">
                <div className="card-header">
                    {this.props.title}
                </div>
                <div className="card-body" dangerouslySetInnerHTML={{__html: this.content}}>
                </div>

                <div className="card-footer">
                    {this.props.footer}
                    {
                        this.props.isPostDetail ? null : <Link to={`postDetail/${this.props.id}`}>Detay</Link>
                    }
                </div>
            </div>
        );
    }
}

export default Post;