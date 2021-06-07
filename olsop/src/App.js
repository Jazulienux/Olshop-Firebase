import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './controller/pages/landing/Login';
import SignUp from './controller/pages/landing/SignUp';
import { AuthProvider } from './controller/auth/Auth';
import firebase from './controller/config/base';
import HeadersAdmin from './controller/pages/admin/HeadersAdmin';
import HeadersUser from './controller/pages/user/HeadersUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        this.setState({ email: res.email });
      } else {
        this.setState({ email: null });
      }
    });
  }

  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            {this.state.email === null ? (
              <Redirect to="/login" />
            ) : this.state.email === 'jazulienux@gmail.com' ? (
              <HeadersAdmin email={this.state.email} />
            ) : (
              <HeadersUser email={this.state.email} />
            )}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
