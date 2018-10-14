import React, { Component } from "react";
import comments from "./dummyCommentaries";

export default class CommentaryList extends Component {
  state = {
    commentaries: comments
  };

  render() {
    const {
      state: { commentaries }
    } = this;
    return (
      <div>
        {commentaries.map(comment => (
          <div id="show-comment">
            <div id="show-comment-header">
              <p>#{comment.id}</p>
              <p>{comment.author}</p>
            </div>
            <div id="show-comment-content">
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
