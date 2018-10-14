import React, { Component } from "react";
import Navbar from "components/Navbar";
import SinglePost from "components/Post";
import CommentaryList from "components/CommentaryList";
import Pagination from "components/Pagination";

export default class Post extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="post-page">
          <SinglePost />
          <div id="new-comment">
            <textarea />
            <h3>Posted by: Johnny Bigode</h3>
          </div>
          <CommentaryList />
          <Pagination />
        </div>
      </div>
    );
  }
}
