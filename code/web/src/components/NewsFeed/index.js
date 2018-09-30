import React from 'react';
import PropTypes from 'prop-types';

const _newsFeed = ({ _news, name }) => (
  <div>
    <p>{_news.length > 0 && name}</p>
    <ul>
      {_news.map(_new => (
        <li id="_new" key={_new.title}>
          <a href={_new.src} id="header">
            {_new.title}
          </a>
          <p>{_new.desc}</p>
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
