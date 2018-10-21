import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const NewsFeed = ({ news, name }) => (
  <div>
    <label id="newsfeedheader">{news.length > 0 && name}</label>
    <ul id="newslist">
      {news.map(id => (
        <li id="newsitem" key={id}>
          <TwitterTweetEmbed tweetId={id} />
        </li>
      ))}
    </ul>
  </div>
);

NewsFeed.propTypes = {
  news: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default NewsFeed;
