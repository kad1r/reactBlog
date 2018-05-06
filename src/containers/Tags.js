import React, {Component} from 'react';
import Tag from "../components/Tag";
import {login, logout} from "../actions/userActionCreator";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addTag, increaseTagCount, removeTag} from "../actions/postActionCreator";
class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
        };
        this.ref;
        this.onAddTagChange = this.onAddTagChange.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    onAddTagChange(event) {
        let value = event.target.value;
        if(value[value.length-1] === ','){
            this.props.increaseTagCount();
            let trimmedValue = value.split(',')[0];
            let newValue = {
                name:trimmedValue,
                id:this.props.post.counter
            };
            this.props.addTag(newValue);
            this.ref.value = '';
        }

    }

    removeTag(removeTag) {
        this.props.removeTag(removeTag)

    }
    shouldComponentUpdate(nextstate,nextProps){
        console.log('next',nextProps)
        return true;
    }
    componentWillReceiveProps(nextProps){

        console.log('nn',nextProps)
    }
    getTags(){
        return this.props.post.tags.map((tag) => <div className='tag' key={tag.id} tagName={tag.name}
                                                      onClick={this.removeTag.bind(this, tag)}>{tag.name +' x'}</div>)
    }
    render() {
        return (
            <div className='mt-2 mb-2'>
                    <input ref={(ref) => this.ref = ref}
                           type="text"
                           className="form-control"
                           style={{marginTop: 10, marginBottom: 10}}
                           placeholder="Etiket Giriniz"
                           onChange={this.onAddTagChange}/>
                        {this.getTags()}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        post: state.post
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addTag:addTag, removeTag:removeTag,increaseTagCount:increaseTagCount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);