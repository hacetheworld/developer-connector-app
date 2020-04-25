import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/set-authToken";
import { setCurrentUser, logoutUser } from "./redux/actions/auth.action";
import store from "./redux/store";

import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";
import Navbar from "./component/layout/Navbar";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Dashboard from "./component/dashbord/dashbord";

import EditProfile from "./component/edit-profile/EditProfile";

import AddExperience from "./component/add-credentials/add-experience";

import AddEducation from "./component/add-credentials/add-education";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import PrivateRoute from "./component/common/Private-route";
import CreateProfile from "./component/create-profile/CreateProfile";

import NotFound from "./component/not-found/NotFound";
// check token

if (localStorage.jwtToken) {
  // set auth tioken
  setAuthToken(localStorage.jwtToken);

  // decode token
  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // todo
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />

          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />

              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />

              <PrivateRoute
                exact
                path="/add-exprience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />

              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/not-found" component={NotFound} />
            </Switch>{" "}
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
