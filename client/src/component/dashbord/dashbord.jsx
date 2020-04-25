import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCurrentProfile,
  deleteAccount,
} from "../../redux/actions/profile.action";
import Spinner from "../common/Spinner.js";
import ProfileAction from "./profileActions";

import Education from "./Education";
import Experience from "./Experience";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleDeleteAccount = () => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        const { handle } = profile;

        dashboardContent = (
          <>
            {" "}
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${handle}`}>{handle}</Link>
            </p>
            {/* <!-- Dashboard Actions --> */}
            <ProfileAction />
            {/* //delete button */}
            <Education education={profile.education} />
            <Experience experience={profile.experience} />
            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.handleDeleteAccount}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
            </div>
          </>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not setup profile please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
