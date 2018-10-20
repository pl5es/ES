import React from 'react';
import PropTypes from 'prop-types';

const BookmarkSelector = ({ bookmarks, selectedBookmark, handleBookmarkToggle, handleBookmarkClick, handleAddBookmark }) => (
    <div>
      <p> YOUR BOOKMARKS </p>
      <p> Choose one or more of your bookmarks to make a selection from the feeds posts </p>

      <form>
        {bookmarks.map(bookmark => (
          <label key={bookmark.id}>
            <input
              name={bookmark.name}
              type="checkbox"
              checked={bookmark.toggled}
              onChange={(event) => handleBookmarkToggle(event)} />
            <button
              onClick={(event) => handleBookmarkClick(event,bookmark)}>
              {bookmark.name}
            </button>
          </label>
        ))}
      </form>

      {selectedBookmark!=null && 
        <label>
          {selectedBookmark.name + "'s hashtags are"}
          {selectedBookmark.interests.map(interest => (
            <label key={interest.id}>
              {interest.hashtag},
            </label>
          ))}
        </label>
      }

      

    </div>
);

BookmarkSelector.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  selectedBookmark: PropTypes.object,
  handleBookmarkToggle: PropTypes.func.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  handleAddBookmark: PropTypes.func.isRequired,
};

export default BookmarkSelector;