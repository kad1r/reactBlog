import React, {Component} from 'react';
import Navbar from "../public/Navbar";
import {login, logout} from "../../actions/userActionCreator";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addCategory, removeCategory} from "../../actions/postActionCreator";

class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enableEdit: false,
        };
        this.onCategoryAddPress = this.onCategoryAddPress.bind(this);
        this.onCategorySavePress = this.onCategorySavePress.bind(this);
    }

    onCategoryAddPress() {
        this.setState({enableEdit: true});
    }
    onCategorySavePress(){
        this.setState({enableEdit: false});
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Navbar/>
            <div className='row mt-2'>
                <div className='col-12'>
                    <ul className="list-group">
                        {
                            this.props.post.categories ?
                                Object.keys(this.props.post.categories).map((category) => {
                                    return <li key={category + new Date()}
                                               className="list-group-item">{category}</li>
                                }) : null
                        }
                    </ul>
                <button className="btn btn-info mt-2 mb-2" onClick={this.onCategoryAddPress}>
                    Kategori Ekle
                </button>

                {
                    this.state.enableEdit ?
                        <div>
                            <input type="text"
                               className="form-control mt-2 mb-4"
                               value=""
                               onChange={this.onTitleChange}/>
                            <button className="btn btn-success"
                                    type="button"
                                    onClick={this.onCategorySavePress}>Kaydet</button>
                        </div>
                        : null
                }

            </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post:state.post,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCategory,
        removeCategory
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);