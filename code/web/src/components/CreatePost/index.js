import React, { Component } from "react";

export class CreatePost extends Component {
  state = {
    text: ""
  };

  handleInputChange = ev => {
    this.setState({
      text: ev.target.value
    });
  };

  cleanInput() {
    this.setState({
      text: ""
    });
  }

  render() {
    const {
      props: { post },
      state: { text }
    } = this;
    return (
      <div>
        <textarea value={text} onChange={ev => this.handleInputChange(ev)} />
        <button
          onClick={() => {
            post(text);
            this.cleanInput();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default CreatePost;
