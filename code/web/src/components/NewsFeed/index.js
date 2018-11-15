import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const NewsFeed = ({ news, name, posts }) => (
  <div>
    <label id="newsfeedheader">{news.length > 0 && name}</label>

    <ul id="newslist">
      {news.map(id => (
        <li id="newsitem" key={id}>
          <TwitterTweetEmbed tweetId={id} />
        </li>
      ))}
    </ul>

    {posts && <ul id="postlist">
      {posts.map(post => (
        <li key={post.name}>
          <a href={post.url} target="_blank">{post.title}</a>
          <p> By: {post.author} in r/{post.subreddit}, 
            {post.num_comments} <a href={"https://reddit.com"+post.permalink} target="_blank">comments</a>, 
            {post.score} upvotes 
          </p>
        </li>
      ))}
    </ul>}

  </div>
);

NewsFeed.propTypes = {
  news: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default NewsFeed;
