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
    selectCategory, selectPostMode, setPostContent, setPostState, setPostTitle
} from "../../actions/postActionCreator";
import moment from 'moment';
import {generateSlug} from "../../utils/utils";
import Navbar from "../public/Navbar";
import {uploadImage} from "../../firebase/firebase";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogPost: 'test',
            content: null,
            title: null,
            tags: [],
            category: '',
            state: 1
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onPostSubmit = this.onPostSubmit.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onPostStateChange = this.onPostStateChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.props.loadPostData(this.props.user.uid);
        this.tagInput;
        this.editorInput;
        this.headerInput;
        this.onAddTagChange = this.onAddTagChange.bind(this);

    }
    componentDidMount(){
        this.setState({
            tag:this.props.post.editPost.tags,
            content: this.props.post.editPost.content,
            title:this.props.post.editPost.title,
            category:this.props.post.editPost.category,
            state:this.props.post.editPost.state
        })
    }
    onTitleChange(e) {
        this.setState({title: e.target.value});
    }

    onContentChange(e) {
        console.log(e);
        this.setState({content: e.target.value.toString()});
    }
    onPostStateChange(e) {
        this.setState({state:e.target.value});
    }

    uploadImages(e, editor, images) {
        uploadImage(images[0]).then((image) => {
            editor.image.insert(image);

        });

        return false;
    }

    onPostSubmit(e) {
        e.preventDefault();

        this.props.addPost({
            title: this.state.title,
            content: this.state.content,
            timestamp: moment().unix(),
            tags: this.state.tags,
            slug: generateSlug(this.state.title),
            category: this.state.category,
            state: this.state.state
        });
        this.setState({
            tag:'',
            content: null,
            title:'',
            category:'',
            state:''
        })

    }

    onCategoryChange(e) {
        this.setState({category:e.target.value});
    }

    getTags() {
        return this.state.tags.map((tag) => <div className='tag'
                                                 key={tag.id}
                                                 tagName={tag.name}
                                                 onClick={this.removeTag.bind(this, tag)}>
            {tag.name + ' x'}
        </div>)
    }

    removeTag(removeTag) {
        let oldState = this.state.tags;
        let index = oldState.indexOf(removeTag);
        if (index !== -1) oldState.splice(index, 1);
        this.setState({tags:oldState})
    }

    onAddTagChange(event) {
        let value = event.target.value;
        this.setState({tag:value});
        if (value[value.length - 1] === ',') {
            let trimmedValue = value.split(',')[0];
            this.props.increaseTagCount();
            let newValue = {
                name: trimmedValue,
                id: this.props.post.editPost.counter
            };
            let oldState = this.state.tags;
            oldState.push(newValue);
            this.setState({tags:oldState});
            this.setState({tag:''});

        }
    }

    render() {
        console.log("STATEE: ",this.state.content)
        if (!this.props.user) {
            this.props.history.push('/404');
            return false;
        }
        return (
            <div>
                <Navbar/>
                <div className='row mt-2'>
                    <div className='col-md-8 col-12'>

                        <input type="text"
                               className="form-control mt-2 mb-4"
                               placeholder="Başlık giriniz"
                               value={this.state.title}
                               onChange={this.onTitleChange}/>
                        <FroalaEditor
                            config={{
                                events: {
                                    'froalaEditor.image.beforeUpload': this.uploadImages,
                                }
                            }}
                            model={this.state.content}
                            onModelChange={this.onContentChange}
                            ref={(ref) => this.editorInput = ref}
                            tag='textarea'/>
                        <div className='mt-2 mb-2'>
                            <input ref={(ref) => this.tagInput = ref}
                                   type="text"
                                   value={this.state.tag}
                                   className="form-control"
                                   style={{marginTop: 10, marginBottom: 10}}
                                   placeholder="Etiket Giriniz"
                                   onChange={this.onAddTagChange}/>
                            {this.getTags()}
                        </div>
                    </div>

                    <div className='col-md-4 col-12'>
                        <form onSubmit={this.onPostSubmit}>
                            <div className="input-group mt-2 mb-4">
                                <select className="custom-select"
                                        id="inputGroupSelect04"
                                        value={1}
                                        onChange={this.onPostStateChange}>
                                    <option value="1">Yayında</option>
                                    <option value="2">Taslak</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-success"
                                            type="submit">
                                        Paylaş
                                    </button>
                                </div>
                            </div>
                            <select className="custom-select"
                                    id="inputGroupSelect04"
                                    onChange={this.onCategoryChange}>
                                <option value={this.state.category} >Kategoriler</option>
                                {
                                    this.props.post.editPost.categories && this.props.post.editPost.categories.length > 0 ?
                                        this.props.post.editPost.categories.map((category) => {
                                            return <option
                                                key={category}
                                                value={category}>
                                                {category}
                                            </option>
                                        }) : null
                                }
                            </select>
                        </form>
                    </div>
                </div>
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
        addPost,
        loadPostData,
        selectCategory,
        removeTag,
        increaseTagCount,
        setPostTitle,
        addTag,
        removePostData,
        setPostContent,
        setPostState,
        selectPostMode
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);


