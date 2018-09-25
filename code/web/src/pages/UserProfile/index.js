import React, { Component } from 'react';
import ShowProfile from 'pages/UserProfile/ShowProfile';
import EditProfile from 'pages/UserProfile/EditProfile';
import Navbar from 'components/Navbar';
import user from "utils/dummyUser";

class UserProfile extends Component {
  state = {
    currentScreen: 'show',
    values: user,
  };

  setEditProfile = () => {
    this.setState({
      currentScreen: 'edit',
    });
  };

  setShowProfile = () => {
    this.setState({
      currentScreen: 'show',
    });
  };

  render() {
    const {
      state: { currentScreen, values },
      setEditProfile,
      setShowProfile,
    } = this;

    console.log(values)
    return (
      <div>
        <Navbar />
        <h1>User Profile</h1>
        {currentScreen === 'show' ? (
          <ShowProfile setEditProfile={setEditProfile} values={values} />
        ) : (
          <EditProfile setShowProfile={setShowProfile} values={values} />
        )}
      </div>
    );
  }
}

export default UserProfile;
