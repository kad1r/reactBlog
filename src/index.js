import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import Home from './containers/public/Home';
import reducers from './reducers';
import BookList from './components/book-list';
import '../style/bootstrap.css';
import '../style/style.css';
import Posts from "./containers/public/Posts";
import PostDetail from "./containers/public/PostDetail";
import Admin from "./containers/admin/Admin";
import * as firebase from 'firebase';

import 'jquery';
import "../style/bootstrap.css";
import 'bootstrap/dist/js/bootstrap';
import Login from "./containers/admin/Login";

import {loadState, saveState} from "./localStorage";
import Categories from "./containers/admin/Categories";
import AddPost from "./containers/admin/AddPost";
import Dashboard from "./containers/admin/Dashboard";

const Page404 = ()=> {
  return <h1>hata</h1>
};


const store = createStore(reducers, loadState(),applyMiddleware(thunk));

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
                <Route exact path="/admin/dashboard" component={Dashboard}/>
                <Route exact path="/admin/categories" component={Categories}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/" component={Home}/>
                <Route exact component={Page404} />
            </Switch>
        </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
