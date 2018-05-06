import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Post extends Component {
    render() {
        return (
            <div className="card mt-4 mb-4">
                <div className="card-header">
                    {this.props.title}
                </div>
                <div className="card-body">
                    {this.props.content}

                    {
                        this.props.isPostDetail ? null : <Link to={`postDetail/${this.props.id}`}>Detay</Link>
                    }
                </div>
                <div className="card-footer">
                    {this.props.footer}
                </div>
            </div>
        );
    }
}

export default Post;