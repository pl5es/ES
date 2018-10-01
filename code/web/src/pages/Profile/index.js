import React, { Component } from "react";
import { getMyInfo } from "utils/api";
import Navbar from "components/Navbar";

class Profile extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    getMyInfo().then(res => {
      this.setState({
        user: res.data
      });
    });
  }

  render() {
    const {
      state: { user }
    } = this;
    console.log(user);
    return (
      <div>
        <Navbar history={this.props.history} />
        <div className="profile">
          <div className="text-info">
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
          </div>
        </div>
        <h4 className="bio-text">{user.description}</h4>
      </div>
    );
  }
}

export default Profile;
