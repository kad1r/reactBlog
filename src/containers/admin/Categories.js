import React, {Component} from 'react';
import Navbar from "../public/Navbar";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addCategory, loadPostData, removeCategory} from "../../actions/postActionCreator";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableEdit: false,
            categoryName:''
        };
        this.onCategoryAddPress = this.onCategoryAddPress.bind(this);
        this.onCategorySavePress = this.onCategorySavePress.bind(this);
        this.onCategoryNameChange = this.onCategoryNameChange.bind(this);
    }

    componentDidMount(){
        this.props.loadPostData(this.props.user.uid);
    }

    onCategoryAddPress() {
        this.setState({enableEdit: true});
    }

    onCategorySavePress(){
        this.setState({enableEdit: false,categoryName:''} );
        this.props.addCategory(this.state.categoryName,this.props.user.uid)
    }

    onCategoryRemovePress(category){
        this.setState({enableEdit: false});
        this.props.removeCategory(category,this.props.user.uid)

    }

    onCategoryNameChange(e){
        this.setState({categoryName:e.target.value})
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Navbar/>
            <div className='row mt-2'>
                <div className='col-12'>
                    <table className={'ReactTable -striped -highlight mt-2 mb-2'}>

                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Kategori Adı</th>
                                <th scope="col"></th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.post.hasOwnProperty('categories') && this.props.post.categories && this.props.post.categories.length > 0?
                                    this.props.post.categories.map((category) => {
                                        return (
                                            <tr>
                                                <th scope="row">{category}</th>
                                                <td onClick={this.onCategoryRemovePress.bind(this,category)}>sil</td>
                                            </tr>
                                        )
                                    }) : null
                            }

                            </tbody>
                        </table>
                    <tr className="list-group">

                    </tr>
                    </table>
                <button className="btn btn-info mt-2 mb-2" onClick={this.onCategoryAddPress}>
                    Kategori Ekle
                </button>

                {
                    this.state.enableEdit ?
                        <div>
                            <input type="text"
                               className="form-control mt-2 mb-4"
                               value={this.state.categoryName}
                               onChange={this.onCategoryNameChange}/>
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
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addCategory,
        removeCategory,
        loadPostData
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);