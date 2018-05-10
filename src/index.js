import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import Home from './containers/public/Home';
import reducers from './reducers';
import BookList from './components/book-list';
import Posts from "./containers/public/Posts";
import AdminPosts from "./containers/admin/Posts";
import PostDetail from "./containers/public/PostDetail";
import Admin from "./containers/admin/Admin";
import * as firebase from 'firebase';
import Login from "./containers/admin/Login";
import Categories from "./containers/admin/Categories";
import AddPost from "./containers/admin/AddPost";
import Dashboard from "./containers/admin/Dashboard";
import EditPost from "./containers/admin/EditPost";
import {loadState, saveState} from "./localStorage";

import 'jquery';
import "../style/bootstrap.css";
import '../style/style.css';
import 'bootstrap/dist/js/bootstrap';
import Search from "./containers/public/Search";


const Page404 = () => {
    return <h1>hata</h1>
};

let userId = null;
const store = createStore(reducers, loadState(), applyMiddleware(thunk));

store.subscribe(() => {
    console.log('State:', store.getState());
    saveState(store.getState())
});

const config = {
    apiKey: "AIzaSyAtsy2R0sB83x9eaSfxLCbdJA1iuliDYzY",
    authDomain: "mrkacancom.firebaseapp.com",
    databaseURL: "https://mrkacancom.firebaseio.com",
    projectId: "mrkacancom",
    storageBucket: "mrkacancom.appspot.com",
    messagingSenderId: "891122877405"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/postDetail/:postId/" component={PostDetail}/>
                <Route exact path="/book-list" component={BookList}/>
                <Route exact path="/posts" component={Posts}/>
                <Route exact path="/admin" component={Admin}/>
                <Route exact path="/admin/settings" component={Admin}/>
                <Route exact path="/admin/addpost" component={AddPost}/>
                <Route exact path="/admin/editpost/:slug" component={EditPost}/>
                <Route exact path="/admin/posts" component={AdminPosts}/>
                <Route exact path="/admin/dashboard" component={Dashboard}/>
                <Route exact path="/admin/categories" component={Categories}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/search/:searchQuery" component={Search}/>
                <Route exact path="/" component={Home}/>
                <Route exact component={Page404}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userId = user.uid;
        console.log(userId)


    } else {


    }
});

