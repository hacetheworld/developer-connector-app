import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import classnames from "classnames";
import TextField from "../common/textField-group";

import { registerUser } from "../../redux/actions/auth.action";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;

    const newUser = { name, email, password, password2 };

    if (password !== password2) {
      alert("password does not match");
      return;
    }
    this.props.registerUser(newUser, this.props.history);

    this.setState({ name: "", email: "", password: "", password2: "" });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashbord");
    }
  }

  render() {
    const { name, email, password, password2 } = this.state;
    const { errors } = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.handleOnSubmit}>
                <TextField
                  type="text"
                  value={name}
                  onChange={this.handleOnChange}
                  placeholder="Name"
                  name="name"
                  error={errors.name}
                />

                <TextField
                  type="email"
                  value={email}
                  onChange={this.handleOnChange}
                  placeholder="Email Address"
                  name="email"
                  error={errors.email}
                  info=" This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />

                <TextField
                  type="password"
                  value={password}
                  onChange={this.handleOnChange}
                  placeholder="Password"
                  name="password"
                  error={errors.password}
                />

                <TextField
                  type="password"
                  value={password2}
                  onChange={this.handleOnChange}
                  placeholder="Confirm Password"
                  name="password2"
                  error={errors.password2}
                />

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
  registerUser: (user, history) => dispatch(registerUser(user, history)),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
