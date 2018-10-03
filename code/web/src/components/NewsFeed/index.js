import React from 'react';
import PropTypes from 'prop-types';

const _newsFeed = ({ _news, name }) => (
  <div>
    <label id="newsfeedheader">{_news.length > 0 && name}</label>
    <ul id="newslist">
      {_news.map(_new => (
        <li id="newsitem" key={_new.title}>
          <a href={_new.src} id="newslink">
            {_new.title}
          </a>
          <label id="newsdesc">{_new.desc}</label>
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
