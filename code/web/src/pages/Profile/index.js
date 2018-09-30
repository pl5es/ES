import React, { Component } from "react";
import { getMyInfo } from "utils/api";

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
    console.log(user)
    return <p>{JSON.stringify(user)}</p>
  }
}

export default Profile;
