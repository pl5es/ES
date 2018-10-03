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
        <div className="navbar-right" id="navbarlinks">
          <Link id="linkprofile" to="/profile">Profile</Link>
          <Link id="linkfeed" to="/feed">News Feed</Link>
          <button id="logoutbutton" onClick={() => this.logout()}> <label>Logout</label> </button>
        </div>
        <input id="navbarsearch"
          placeholder="Search Pando"
          type="text"
          onChange={this.handleInputChange}
          value={this.state.query}
        />
        <button id="navbarbutton" onClick={() => search(query)}> <label>Search</label> </button>
      </div>
    );
  }
}
