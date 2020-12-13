import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Friends from './components/friends/Friends';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Chat from './components/chat/Chat';
import PrivateRoute from './components/routing/PrivateRoute';
import { disconnectWebSocket } from './actions/chat';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { setWebSocketURL } from './actions/chat';
import './App.css';
//axios.defaults.baseURL = 'http://linkus-back-lb';
const qs = (function (a) {
    if (a === '') return {};
    let b = {};
    for (let i = 0; i < a.length; ++i) {
        let p = a[i].split('=', 2);

        if (p.length === 1) b[p[0]] = '';
        else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
        console.log(b[p[0]]);
    }
    return b;
})(window.location.search.substr(1).split('&'));

axios.defaults.baseURL = qs['webapp'];
setWebSocketURL(qs['webapp']);

//axios.defaults.baseURL = 'http://localhost:8080';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    //第一次放問時，或重新整理時，進行用戶認證，並獲取用戶基本資料
    useEffect(() => {
        // componentDidMount is here!
        store.dispatch(loadUser());
    }, []);

    //DidMount時綁定unlaod事件
    useEffect(() => {
        window.addEventListener('onbeforeunload', onUnmount());
    }, []);

    //WillUnmount時移除綁定事件
    useEffect(() => {
        return () => {
            window.removeEventListener('onbeforeunload', onUnmount());
        };
    }, []);

    const onUnmount = () => {
        disconnectWebSocket();
    };

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/profiles'
                                component={Profiles}
                            />
                            <Route
                                exact
                                path='/profile/:id'
                                component={Profile}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/create-profile'
                                component={CreateProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/edit-profile'
                                component={EditProfile}
                            />
                            <PrivateRoute
                                exact
                                path='/add-experience'
                                component={AddExperience}
                            />
                            <PrivateRoute
                                exact
                                path='/add-education'
                                component={AddEducation}
                            />
                            <PrivateRoute
                                exact
                                path='/posts'
                                component={Posts}
                            />
                            <PrivateRoute
                                exact
                                path='/posts/:id'
                                component={Post}
                            />
                            <PrivateRoute
                                exact
                                path='/friends'
                                component={Friends}
                            />
                            <PrivateRoute exact path='/chat' component={Chat} />
                            <Route component={NotFound} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
