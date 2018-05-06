import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class BookDetail extends Component {
    componentDidMount(){
            this.props.history.push('/');
    }
    render() {
        if(!this.props.book){
            return <div>
                <div>Select book</div>
                <Link to="/">
                Link to home
            </Link>
            </div>
        }
        return(
            <div>
                <h3>Details for:</h3>

                <div>{this.props.book.title}</div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        book:state.activeBook
    }
}
// function mapDispatchToProps(dispatch){
//
// }

export default connect(mapStateToProps)(BookDetail)