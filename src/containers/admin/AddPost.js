import React, {Component} from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {login, logout} from "../../actions/userActionCreator";
import {
    addPost,
    addTag,
    increaseTagCount,
    loadPostData, removePostData,
    removeTag,
    selectCategory
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
            editorValue: ''
        };

        this.onLogout = this.onLogout.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.onPostSubmit = this.onPostSubmit.bind(this);
        this.uploadImages = this.uploadImages.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.props.loadPostData(this.props.user.uid);
        this.tagInput;
        this.editorInput;
        this.headerInput;
        this.onAddTagChange = this.onAddTagChange.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    onLogout() {
        this.props.logout();
        this.props.history.push('/admin');
    }

    onTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleModelChange(e) {
        this.setState({editorValue: e});
    }

    uploadImages(e, editor, images){
        console.log(images[0])

       uploadImage(images[0]).then((image)=> {
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
            title: this.state.title,
            content: this.state.editorValue,
            timestamp: moment().unix(),
            tags: this.props.post.tags,
            slug: generateSlug(this.state.title),
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
                               onChange={this.onTitleChange}/>
                        <FroalaEditor
                            config={{
                                placeholder: "Edit Me",
                                events: {
                                    'froalaEditor.image.beforeUpload':this.uploadImages
                                },
                                charCounterCount: false
                            }}
                            model={this.state.editorValue}
                            ref={(ref) => this.editorInput = ref}
                            onModelChange={this.handleModelChange}
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
                                        defaultValue>
                                    <option defaultValue>Seçim...</option>
                                    <option value="1">Yayında</option>
                                    <option value="2">Taslak</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-success"
                                            type="submit">
                                        Kaydet
                                    </button>
                                </div>
                            </div>

                            <select className="custom-select"
                                    id="inputGroupSelect04"
                                    defaultValue={this.state.blogState}
                                    onChange={this.onCategoryChange}>
                                <option selected value={undefined} defaultValue>Kategoriler</option>

                                {
                                    this.props.post.categories ?
                                        Object.keys(this.props.post.categories).map((category) => {
                                            return <option key={category} value={category}>{category}</option>
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
        login: login,
        logout: logout,
        addPost: addPost,
        loadPostData: loadPostData,
        selectCategory: selectCategory,
        removeTag: removeTag,
        increaseTagCount: increaseTagCount,
        addTag,
        removePostData,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);