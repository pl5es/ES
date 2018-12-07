import React, { Component } from "react";
import { orcidPost } from "utils/api";

export default class Orcid extends Component {
  state = {
    response: {}
  };

  componentDidMount() {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {

      orcidPost(code)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        {this.state.response ? (
          <div>
            <a href="https://orcid.org/oauth/authorize?client_id=APP-D7HK0ZRV7DLASQHI&response_type=code&scope=/authenticate&redirect_uri=http://localhost:3001/auth/orcid/callback">
              Authorize request
            </a>
          </div>
        ) : (
          <h1>oi</h1>
        )}
      </div>
    );
  }
}
