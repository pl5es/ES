import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookmarkSelector extends Component{
  state = {
    newBookmark: '',
    newHashtags: '',
    newURL:'',
    searchInput: '',
  }

  render(){
    const{
      props:{
        bookmarks, 
        clickedFolder,
        clickedBookmark, 
        handleBookmarkClick,
        handleSearchBookmark, 
        handleAddBookmark, 
      },
      state:{
        newBookmark,
        newHashtags,
        newURL,
        searchInput,
      }
    }=this;
    return(
      <div>
        <label>SEARCH BOOKMARKS - Search bookmarks in folder by hashtag</label>
        <form onSubmit={(event) => {handleSearchBookmark(event,searchInput);
                                    this.setState({ searchInput: '' }); } }>
          <label>
            <input 
              type="text" 
              value={searchInput}
              placeholder={"Example: #dogs"} 
              onChange={ev => {
                this.setState({ searchInput: ev.target.value });
              }} 
            />
          </label>
        </form>

        <label> YOUR FOLDERS - Click on one to view its bookmarks </label>

        <label> YOUR BOOKMARKS - Click on one to view its hashtags </label>

        {bookmarks.map(bookmark => (
          <label key={bookmark.id}>
            <button
              onClick={(event) => handleBookmarkClick(event,bookmark)}
              style={{color: 'black'}}>
              {bookmark.name}
            </button>
            <a href="" target="_blank">OPEN LINK</a>
          </label>
        ))}

        {clickedFolder!=null &&
          <label>
            {clickedFolder.name + "'s bookmarks are:"}
            {clickedFolder.bookmarks.map(bookmark => (
              <label key={bookmark.id}>
                <button
                  onClick={(event) => handleBookmarkClick(event,bookmark)}
                  style={{color: 'black'}}>
                  {bookmark.name}
                </button>
                <a href="" target="_blank">OPEN LINK</a>
              </label>
            ))}
          </label>
        }

        {clickedBookmark!=null && 
          <label>
            {clickedBookmark.name + "'s hashtags are:"}
            {clickedBookmark.interests.map(interest => (
              <label key={interest.id}>
                {interest.hashtag}
              </label>
            ))}
          </label>
        }

        <form onSubmit={(event) => {handleAddBookmark(event,newBookmark,newHashtags,newURL);
                                    this.setState({ newBookmark: '', newHashtags:'', newURL:'' }); } }>
          <h3>Edit Bookmarks</h3>
          <h6>Add new bookmark or edit existing one's hashtags </h6>
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
            URL:
            <input 
              type="text" 
              value={newHashtags}
              placeholder={"Example: animals.com"} 
              onChange={ev => {
                this.setState({ newHashtags: ev.target.value });
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
            value="Edit"
            style={{color: 'black'}} 
          />
        </form>

      </div>
    );
  }

}

BookmarkSelector.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  clickedFolder: PropTypes.object,
  clickedBookmark: PropTypes.object,
  handleBookmarkClick: PropTypes.func.isRequired,
  handleAddBookmark: PropTypes.func.isRequired,
  handleSearchBookmark: PropTypes.func,
};

export default BookmarkSelector;