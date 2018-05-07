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
    loadPostData,
    removePostData,
    removeTag,
    selectCategory,
    selectPostMode,
    setPostContent,
    setPostState,
    setPostTitle, updatePost
} from "../../actions/postActionCreator";
import moment from 'moment';
import {generateSlug} from "../../utils/utils";
import Navbar from "../public/Navbar";
import {uploadImage} from "../../firebase/firebase";
import update from "react-addons-update";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: '',
            category: '',
            state: 0,
            tags: [],
            tagCount: 0,
            test:''
        };

        this.handleModelChange = this.handleModelChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onPostUpdate = this.onPostUpdate.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onPostStateChange = this.onPostStateChange.bind(this);
        this.props.loadPostData(this.props.user.uid);
        this.tagInput;
        this.editorInput;
        this.headerInput;
        this.onAddTagChange = this.onAddTagChange.bind(this);
        this.onRemoveTag = this.onRemoveTag.bind(this);

    }

    componentDidMount() {

        this.props.post.posts.map((post) => {
            if (post.slug === this.props.match.params.slug) {
                this.setState({
                    tags: post.tags,
                    category: post.category,
                    title: post.title,
                    content: post.content,
                    state: post.state,
                    key:post.key
                });
                console.log()
            }
        });

    }


    onTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleModelChange(content) {
        this.setState({editorValue: content})
    }

    onPostStateChange(e) {
        this.setState({state: e.target.value});
    }

    uploadImages(e, editor, images) {
        uploadImage(images[0]).then((image) => {
            editor.image.insert(image);

        });

        return false;
    }

    onRemoveTag(tag) {
        update(this.state, {
            tags: {
                $apply: (val) => {
                    return val.filter((v) => v.id !== tag.id)
                }
            }
        });
    }

    onPostUpdate(e) {
        e.preventDefault();
        if (!this.state.title || !this.state.content || !this.state.category) {
            return false;
        }
        this.props.updatePost({
            title: this.state.title,
            content: this.state.content,
            timestamp: moment().unix(),
            tags: this.state.tags,
            slug: generateSlug(this.state.title),
            category: this.state.category,
            state: 1,
            key:this.state.key

        });
        this.tagInput.value = '';
        this.headerInput.value = '';
        this.setState({editorValue: ''})

    }

    onCategoryChange(e) {
        this.setState({category: e.target.value});
    }

    getTags() {
        return this.state.tags.map((tag) => <div className='tag' key={tag.id} tagName={tag.name}
                                                 onClick={this.onRemoveTag.bind(this, tag)}>{tag.name + ' x'}</div>)
    }

    onAddTagChange(event) {
        let value = event.target.value;
        if (value[value.length - 1] === ',') {
            this.setState({tagCount: this.state.tagCount + 1})
            let trimmedValue = value.split(',')[0];
            let newValue = {
                name: trimmedValue,
                id: this.state.counter
            };
            this.onAddTag(newValue);
            this.tagInput.value = '';
        }
    }

    onAddTag(tag) {
        let tagState = this.state.tags;
        tagState.push(tag);
        this.setState({tags: tagState})
    }

    render() {
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
                               ref={(ref) => this.headerInput = ref}
                               className="form-control mt-2 mb-4"
                               placeholder="Başlık giriniz"
                               value={this.state.title}
                               onChange={this.onTitleChange}/>
                        <FroalaEditor
                            config={{
                                placeholder: "Edit Me",
                                events: {
                                    'froalaEditor.image.beforeUpload': this.uploadImages,
                                    'froalaEditor.contentChanged': this.handleModelChange,

                                }
                            }}
                            model={this.state.content}
                            onModelChange={this.handleModelChange}
                            ref={(ref) => this.editorInput = ref}
                            tag='textarea'/>
                        <div className='mt-2 mb-2'>
                            <input ref={(ref) => this.tagInput = ref}
                                   type="text"
                                   className="form-control"
                                   style={{marginTop: 10, marginBottom: 10}}
                                   placeholder="Etiket Giriniz"
                                   onChange={this.onAddTagChange}/>
                            {this.getTags()}
                        </div>
                    </div>

                    <div className='col-md-4 col-12'>

                        <form onSubmit={this.onPostUpdate}>
                            <div className="input-group mt-2 mb-4">
                                <select className="custom-select"
                                        id="inputGroupSelect04"
                                        defaultValue={this.state.state}
                                        onChange={this.onPostStateChange}>
                                    <option value="1">Yayında</option>
                                    <option value="2">Taslak</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-success"
                                            type="submit">
                                        Güncelle
                                    </button>
                                </div>
                            </div>

                            <select className="custom-select"
                                    id="inputGroupSelect04"
                                    defaultValue={this.state.category}
                                    onChange={this.onCategoryChange}>
                                <option value={undefined} defaultValue>Kategoriler</option>

                                {

                                    this.props.post.categories.map((category) => {
                                        return <option selected={this.state.category === category ? true : false}
                                                       key={category}
                                                       value={category}>
                                            {category}
                                        </option>
                                    })

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
        updatePost,
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