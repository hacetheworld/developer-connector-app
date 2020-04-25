import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
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
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    value={name}
                    onChange={this.handleOnChange}
                    name="name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback"> {errors.name} </div>
                  )}
                </div>
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
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.handleOnChange}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    value={password}
                    placeholder="Password"
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    onChange={this.handleOnChange}
                    value={password2}
                    placeholder="Confirm Password"
                    name="password2"
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback"> {errors.password2} </div>
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
