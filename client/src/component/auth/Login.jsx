import React, { Component } from "react";
import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../redux/actions/auth.action";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state, this.props.history);
    this.setState({ email: "", password: "" });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashbord");
    }
  }
  render() {
    const { email, password } = this.state;
    const { errors } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    value={email}
                    onChange={this.handleOnChange}
                    placeholder="Email Address"
                    name="email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback"> {errors.email} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    value={password}
                    onChange={this.handleOnChange}
                    placeholder="Password"
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user, history) => dispatch(loginUser(user, history)),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
