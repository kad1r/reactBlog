import React, { Component } from 'react';
import { connect } from 'react-redux';
//'react-redux' = React redux connection
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
    renderList(){
        return this.props.books.map((book)=>{
            return (
                <button key={book.title}
                        onClick={()=>this.props.selectBook(book)}> {book.title}</button>

            )
        })
    }
  render() {
    return (
          <ul>
              {this.renderList()}
              <div className="alert alert-primary" role="alert">
                  This is a primary alert—check it out!
              </div>
          </ul>
    );
  }
}

function mapStateToProps(state){

    return {
        books:state.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({selectBook: selectBook}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookList);