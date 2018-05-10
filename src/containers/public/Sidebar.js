import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findedPosts:[],
            searchQuery: '',
        };
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
        this.onSearchPress = this.onSearchPress.bind(this);
    }

    render() {
        return (
<div>test</div>
        );
    }
}
export default Sidebar;