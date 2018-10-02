import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  logout = () => {
    localStorage.removeItem("access_token");
    <Redirect to="/" />;
  };

  handleInputChange = ev => {
    this.setState({
      query: ev.target.value
    });
  };

  render() {
    const {
      props: { search },
      state: { query }
    } = this;
    return (
      <div className="navbar">
        <input
          id="search"
          type="text"
          onChange={this.handleInputChange}
          value={this.state.query}
        />
        <button onClick={() => search(query)}>Search</button>
        <div className="navbar-right">
          <Link to="/profile">Profile</Link>
          <Link to="/feed">News Feed</Link>
          <button id="logout-button" onClick={() => this.logout()}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}
