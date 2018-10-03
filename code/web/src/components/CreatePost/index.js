import React, { Component } from 'react';

export class CreatePost extends Component {
  state = {
    text: '',
  };

  handleInputChange = ev => {
    this.setState({
      text: ev.target.value,
    });
  };

  cleanInput() {
    this.setState({
      text: '',
    });
  }

  render() {
    const {
      props: { post },
      state: { text },
    } = this;
    return (
      <div>
        <textarea id="writePost" placeholder="Write new post" value={text} onChange={ev => this.handleInputChange(ev)} />
        <button id="createPost"
          onClick={() => {
            post(text);
            this.cleanInput();
          }}
        >
          <label> Submit </label>
        </button>
      </div>
    );
  }
}

export default CreatePost;
