import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.action";
import { clearCurrentProfile } from "../../redux/actions/profile.action";

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            href="/"
            onClick={() => {
              this.props.logoutUser();
              this.props.clearCurrentProfile();
            }}
          >
            {isAuthenticated ? (
              <img
                style={{ width: "25px", marginRight: "6px" }}
                src={user.avatar}
                alt={user.name}
                className="rounded-circle"
                title="you must have gravtar "
              />
            ) : (
              ""
            )}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Developers
                </Link>
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (user, history) => dispatch(logoutUser(user, history)),
  clearCurrentProfile: () => dispatch(clearCurrentProfile()),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
