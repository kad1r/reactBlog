import React, { Component } from 'react';

class MenuItem extends Component {
    render() {
        return (
            <button type="button"
                    className="btn btn-secondary btn-sm"
                    style={{marginRight:5, marginBottom:5}}>
                <div
                     onClick={this.props.onPressDeleteTag}>
                    {this.props.tagName}  X
                </div>
            </button>

        );
    }
}
export default MenuItem;