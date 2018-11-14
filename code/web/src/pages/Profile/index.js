import React, { Component } from "react";
import { getMyInfo } from "utils/api";
import Navbar from "components/Navbar";
import { API_URL } from "utils/config";
import { connect } from "react-redux";
import { show } from "actions/user";
import { Link } from "react-router-dom";

class Profile extends Component {
  componentWillReceiveProps() {
    //eslint-disable-next-line
    this.props.show;
  }

  render() {
    const {
      props: { user }
    } = this;
    return (
      <div>
        {user && (
          <div className="container">
            <Navbar history={this.props.history} />
            <div className="row container-profile">
              <div className="col-md-2" />
              <div className="col-md-8 profile">
                <div className="container-personal-info">
                  {user.avatar && (
                    <img src={`${API_URL}/${user.avatar.url}`} alt="" />
                  )}
                  <div className="personal-info">
                    <h1 className="name">{user.name}</h1>
                    <h3 className="ORCID-number">
                      {user.orcid}
                      <div className="ORCID-id"> ORCID ID</div>
                    </h3>
                    <h3 className="text">{user.institution}</h3>
                    <h3 className="text">{user.research_area}</h3>
                  </div>
                </div>
                <div className="description">{user.description}</div>
              </div>
              <div class="col-md-2 container-edit-profile">
              <Link to="/edit">Edit Profile</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    show: dispatch(show())
  };
};

const mapStateToProps = state => {
  return {
    userError: state.user.userError,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
