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
import {POST} from "../../constants/constants";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogPost: 'test',
            editorValue: '',
            mode:POST.MODE.ADD_POST
        };

        this.handleModelChange = this.handleModelChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onPostSubmit = this.onPostSubmit.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onPostStateChange = this.onPostStateChange.bind(this);
        this.props.loadPostData(this.props.user.uid);
        this.tagInput;
        this.editorInput;
        this.headerInput;
        this.onAddTagChange = this.onAddTagChange.bind(this);
        this.removeTag = this.removeTag.bind(this);

    }

    componentDidMount() {
            console.log("this.props.match.params",);
        if(this.props.match.params !== {} && this.props.match.params.slug){
            this.props.selectPostMode(POST.MODE.EDIT_POST)
        }
        if(this.props.post.mode = POST.MODE.EDIT_POST){
            this.props.setPostTitle(this.state.title);
            this.props.setPostContent("");
            this.props.setPostState("");

        }else {
            this.headerInput.value = this.props.post.title;

        }

        this.editPostInitialValues();
    }

    editPostInitialValues() {
        this.setState({editorValue: ''})
    }

    onTitleChange(e) {
        this.setState({title: e.target.value});
        clearTimeout(this.setTitleTimeout)
        this.setTitleTimeout = setTimeout((e) => {
            this.props.setPostTitle(this.state.title);
        }, 1000);
    }

    handleModelChange() {
        clearTimeout(this.setContentTimeout);

        this.setContentTimeout = setTimeout((e) => {
            this.props.setPostContent(this.editorInput.$element["0"].value);
        }, 1000);
    }

    onPostStateChange(e){
        this.props.setPostState(e.target.value);
    }

    uploadImages(e, editor, images) {
        console.log(images[0])

        uploadImage(images[0]).then((image) => {
            editor.image.insert(image);

        });

        return false;
    }

    onPostSubmit(e) {
        e.preventDefault();
        if (!this.state.title || !this.state.editorValue || !this.props.post.selectedCategory) {
            return false;
        }
        this.props.addPost({
            title: this.props.post.title,
            content: this.props.post.content,
            timestamp: moment().unix(),
            tags: this.props.post.tags,
            slug: generateSlug(this.props.post.title),
            category: this.props.post.selectedCategory,
            state: 1
        });
        this.props.removePostData();
        this.tagInput.value = '';
        this.headerInput.value = '';
        this.setState({editorValue: ''})

    }

    onCategoryChange(e) {
        this.props.selectCategory(e.target.value);
    }

    getTags() {
        return this.props.post.tags.map((tag) => <div className='tag' key={tag.id} tagName={tag.name}
                                                      onClick={this.removeTag.bind(this, tag)}>{tag.name + ' x'}</div>)
    }

    removeTag(removeTag) {
        this.props.removeTag(removeTag)

    }

    onAddTagChange(event) {
        let value = event.target.value;
        if (value[value.length - 1] === ',') {
            this.props.increaseTagCount();
            let trimmedValue = value.split(',')[0];
            let newValue = {
                name: trimmedValue,
                id: this.props.post.counter
            };
            this.props.addTag(newValue);
            this.tagInput.value = '';
        }
    }

    render() {
        console.log(this)
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
                                    'froalaEditor.contentChanged':this.handleModelChange
                                },
                                charCounterCount: false
                            }}
                            model={this.props.post.content}
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

                        <form onSubmit={this.onPostSubmit}>
                            <div className="input-group mt-2 mb-4">
                                <select className="custom-select"
                                        id="inputGroupSelect04"
                                        defaultValue={this.props.post.state}
                                        onChange={this.onPostStateChange}>
                                    <option value="1">Yayında</option>
                                    <option value="2">Taslak</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-success"
                                            type="submit">
                                        {this.props.post.mode = POST.MODE.ADD_POST ? 'Kaydet' : 'Güncelle'}
                                    </button>
                                </div>
                            </div>

                            <select className="custom-select"
                                    id="inputGroupSelect04"
                                    defaultValue={this.props.post.selectedCategorye}
                                    onChange={this.onCategoryChange}>
                                <option value={undefined} defaultValue>Kategoriler</option>

                                {
                                    this.props.post.categories ?
                                        this.props.post.categories.map((category) => {
                                            return <option selected={this.props.post.selectedCategory === category ? true : false}
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