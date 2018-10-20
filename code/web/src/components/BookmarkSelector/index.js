import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookmarkSelector extends Component{
  state = {
    newBookmark: '',
    newHashtags: '',
  }

  render(){
    const{
      props:{
        bookmarks, 
        clickedBookmark, 
        handleBookmarkToggle, 
        handleBookmarkClick, 
        handleAddBookmark, 
      },
      state:{
        newBookmark,
        newHashtags,
      }
    }=this;
    return(
      <div>
        <h3> YOUR BOOKMARKS </h3>
        <label> Choose one or more of your bookmarks to make a selection from the feeds posts </label>

        <form>
          {bookmarks.map(bookmark => (
            <label key={bookmark.id}>
              <input
                name={bookmark.name}
                type="checkbox"
                checked={bookmark.toggled}
                onChange={(event) => handleBookmarkToggle(event)} />
              <button
                onClick={(event) => handleBookmarkClick(event,bookmark)}
                style={{color: 'black'}}>
                {bookmark.name}
              </button>
            </label>
          ))}
        </form>

        {clickedBookmark!=null && 
          <label>
            {clickedBookmark.name + "'s hashtags are"}
            {clickedBookmark.interests.map(interest => (
              <label key={interest.id}>
                {interest.hashtag},
              </label>
            ))}
          </label>
        }

        <form onSubmit={(event) => handleAddBookmark(event,newBookmark,newHashtags)}>
          <h3>New Bookmark</h3>
          <label>
            Bookmark:
            <input 
              type="text" 
              value={newBookmark} 
              placeholder={"Example: Animals"} 
              onChange={ev => {
                this.setState({ newBookmark: ev.target.value });
              }} 
            />
          </label>
          <label>
            Hashtags:
            <input 
              type="text" 
              value={newHashtags}
              placeholder={"Example: #dogs #cats #parrots #turtles"} 
              onChange={ev => {
                this.setState({ newHashtags: ev.target.value });
              }} 
            />
          </label>
          <input 
            type="submit" 
            value="Submit"
            style={{color: 'black'}} 
          />
        </form>

      </div>
    );
  }

}

BookmarkSelector.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  clickedBookmark: PropTypes.object,
  handleBookmarkToggle: PropTypes.func.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  handleAddBookmark: PropTypes.func.isRequired,
};

export default BookmarkSelector;