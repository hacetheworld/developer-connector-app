import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

import { getProfiles } from "../../redux/actions/profile.action";

import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profiles;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h1>No profiles</h1>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProfiles: () => dispatch(getProfiles()),
});

const mapStateToProps = (state) => ({
  profiles: state.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
