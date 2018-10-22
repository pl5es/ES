import React, { Component } from "react";
import { getMyInfo } from "utils/api";
import Navbar from "components/Navbar";
import { API_URL } from "utils/config";
import { connect } from "react-redux";
import { show } from "actions/user";
import { Link } from "react-router-dom";

class Profile extends Component {
  componentWillReceiveProps() {
    this.props.show;
  }

  render() {
    const {
      props: { user }
    } = this;
    return (
      <div>
        {user && (
          <div>
            <Navbar history={this.props.history} />
            <div className="profile">
              <div className="text-info">
                {user.avatar && (
                  <img src={`${API_URL}/${user.avatar.url}`} alt="" />
                )}
                <h1 className="info-nome">{user.name}</h1>
                <h3 className="info-orcid">
                  {user.orcid}
                  <span className="span-orcid"> ORCID ID</span>
                </h3>
                <h3 className="info-institute">{user.institution}</h3>
                <h3 className="info-area">{user.research_area}</h3>
              </div>

              <div className="follow">
                <h3>Following</h3>
                <h4>15</h4>
                <h3>Followers</h3>
                <h4>12</h4>
                <h3>Articles</h3>
                <h4>1</h4>
                <Link to="/edit">Edit</Link>
              </div>
            </div>
            <h4 className="bio-text">{user.description}</h4>
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
