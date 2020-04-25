import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/set-authToken";
import { setCurrentUser, logoutUser } from "./redux/actions/auth.action";

import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";
import Navbar from "./component/layout/Navbar";

import Login from "./component/auth/Login";
import Register from "./component/auth/Register";

import store from "./redux/store";

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
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
