import React, { Component } from 'react';
import Navbar from 'components/Navbar';
import SinglePost from 'components/Post';
import CommentaryList from 'components/CommentaryList';
import Pagination from 'components/Pagination';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'

export default class Post extends Component {
  state = {
    currentComment: '',
    tags: [],
  };

  handleChange = (tags) => {
    this.setState({ tags: tags });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="post-page">
          <SinglePost />
          <div id="new-comment">
            <h1>Comment</h1>
            <textarea />
            <h1>Tags</h1>
            <TagsInput value={this.state.tags} onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </div>
          <CommentaryList />
          <Pagination />
        </div>
      </div>
    );
  }
}
