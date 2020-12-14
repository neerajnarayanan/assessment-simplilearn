import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { ActionCreators } from '../src/actions/actionCreators';
import { getCurrentUser } from './services/auth.service';


function App(props) {
  const { currentUser, clearUserInfo} = props;
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUserInfo(user);
    }
  }, [currentUser]);
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            {!currentUserInfo && <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>}

          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Register} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={Register} />
              <Route path="/user-profile" component={UserProfile} />
            </Switch>
          </div>
        </div>
      </div></Router>
  );
}

function mapStateToProps(state) {
  const { user } = state
  return { currentUser: user?.data?.user }
}
const mapDispatchToProps = dispatch => ({
  clearUserInfo: () => dispatch(ActionCreators.clearUserData())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
