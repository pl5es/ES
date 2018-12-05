import React, { Component } from "react";
import { authorizeOrcid } from "utils/api";

export default class Orcid extends Component {
  orcidAuth() {
    authorizeOrcid.then(async resp => await {
        let resp = await resp.json();
        console.log(resp);
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.orcidAuth}> Authenticate with ORCID</button>
      </div>
    );
  }
}
