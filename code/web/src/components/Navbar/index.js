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
      <div class="row container-header">
        <div class="col-md-2 margin-left">
          <div class="logo" />
        </div>
        <div class="col-md-10 header">
          <div class="row">
            <div class="col-md-6 container-search-bar">
              <input
                id="navbarsearch"
                placeholder="Search Pando"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.query}
              />
            </div>
            {/* <button id="navbarbutton" onClick={() => search(query)}> <label>Search</label> </button> */}
            <div class="col-md-1 search-icon" />
            <div class="col-md-5 container-icons end">
              <Link id="linkprofile" to="/profile">
                Profile
              </Link>
              <Link id="linkfeed" to="/feed">
                News Feed
              </Link>
              <button id="logoutbutton" onClick={() => this.logout()}>
                <label>Logout</label>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
