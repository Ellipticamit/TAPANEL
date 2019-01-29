import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import store from '../redux/store';
import { Provider } from 'react-redux';
import PrivateRoute from './common/PrivateRoute';
import Dashboard from './dashboard/dashboard';
import User from './user/User';
import { verifyToken } from '../redux/actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  store.dispatch(verifyToken(localStorage.jwtToken));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/user" component={User} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
