import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import tweets from 'utils/consts';

const _newsFeed = ({ _news, name }) => (
  <div>
    <label id="newsfeedheader">{_news.length > 0 && name}</label>
    <ul id="newslist">
      {_news.map(id => (
        <li id="newsitem" key={id}>
          <TwitterTweetEmbed tweetId={id} />
        </li>
      ))}
    </ul>
  </div>
);

_newsFeed.propTypes = {
  _news: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default _newsFeed;
