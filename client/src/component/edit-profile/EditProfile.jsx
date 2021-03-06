import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  createUserProfile,
  getCurrentProfile,
} from "../../redux/actions/profile.action";
import isEmpty from "../../utils/is-empty";
import TextField from "../common/textField-group";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
    };
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.createUserProfile(this.state, this.props.history);
    console.log(this.state);
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toogleSocialNetwork = () => {
    this.setState({ displaySocialInputs: !this.state.displaySocialInputs });
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    if (this.props.profile.profile) {
      const profile = this.props.profile.profile;
      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");
      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      });
    }
  }

  render() {
    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
    } = this.state;

    const { errors } = this.props;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>

              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.handleOnSubmit}>
                <TextField
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  value={handle}
                  error={errors.handle}
                  onChange={this.handleOnChange}
                  info="A unique handle for your profile URL. Your full name,
company name, nickname, etc (This CAN'T be changed later)
"
                />

                <SelectListGroup
                  name="status"
                  value={status}
                  info="Give us an idea of where you are at in your career"
                  error={errors.status}
                  onChange={this.handleOnChange}
                  options={[
                    { label: "* Select Professional Status", value: "0" },
                    { label: "Developer", value: "Developers" },
                    { label: "Junior Developer", value: "Junior Developer" },
                    { label: "Senior Developer", value: "Senior Developer" },
                    { label: "Manager", value: "Manager" },
                    {
                      label: "Student or Learning",
                      value: "Student or Learning",
                    },
                    { label: "Instructor or Teacher", value: "Instructor" },
                    { label: "Intern", value: "Intern" },
                    { label: "Other", value: "Other" },
                  ]}
                />

                <TextField
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={company}
                  error={errors.company}
                  onChange={this.handleOnChange}
                  info=" Could be your own company or one you work for
"
                />

                <TextField
                  type="text"
                  placeholder="Website"
                  name="website"
                  error={errors.website}
                  value={website}
                  onChange={this.handleOnChange}
                  info=" Could be your own company website"
                />

                <TextField
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  error={errors.location}
                  onChange={this.handleOnChange}
                  info=" City & state suggested (eg. India, Mumbai)"
                />

                <TextField
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  error={errors.skills}
                  value={skills}
                  onChange={this.handleOnChange}
                  info=" Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />
                <TextField
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  error={errors.githubusername}
                  onChange={this.handleOnChange}
                  info="  If you want your latest repos and a Github link, include
                  your username"
                />
                <TextAreaFieldGroup
                  type="text"
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={bio}
                  error={errors.bio}
                  onChange={this.handleOnChange}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.toogleSocialNetwork}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                <div className={`${displaySocialInputs ? "" : "d-none"}`}>
                  <InputGroup
                    type="text"
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={twitter}
                    error={errors.twitter}
                    onChange={this.handleOnChange}
                  />
                  <InputGroup
                    type="text"
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={linkedin}
                    error={errors.linkedin}
                    onChange={this.handleOnChange}
                  />
                  <InputGroup
                    type="text"
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={youtube}
                    error={errors.youtube}
                    onChange={this.handleOnChange}
                  />

                  <InputGroup
                    type="text"
                    placeholder="Facebook Channel URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={facebook}
                    error={errors.facebook}
                    onChange={this.handleOnChange}
                  />
                  <InputGroup
                    type="text"
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={instagram}
                    error={errors.instagram}
                    onChange={this.handleOnChange}
                  />
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
  createUserProfile: (userProfile, history) =>
    dispatch(createUserProfile(userProfile, history)),
  getCurrentProfile: () => dispatch(getCurrentProfile()),
});
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));
