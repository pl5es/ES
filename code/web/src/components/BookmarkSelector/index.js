import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookmarkSelector extends Component{
  state = {
    searchInput: '',
    newFolder:'',
    newBookmarkInput: '',
    newURLInput:'',
    newHashtagsInput: '',
    newFolderInput:'',
  }

  render(){
    const{
      props:{
        bookmarks, 
        clickedFolder,
        clickedBookmark, 
        handleBookmarkClick,
        handleSearchBookmark, 
        handleAddFolder, 
        handleAddBookmark,

        showAddFolder,
        showAddBookmark,
        handleShowAddBookmark,
        handleShowAddFolder,
      },
      state:{
        newFolder,
        newBookmarkInput,
        newURLInput,
        newHashtagsInput,
        newFolderInput,
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
              onChange={ev => { this.setState({ searchInput: ev.target.value });}} 
            />
          </label>
        </form>

        <label> YOUR FOLDERS - Click on one to view its bookmarks </label>
        <button
          onClick={() => handleShowAddFolder()}
          style={{color: 'black'}}>
          Add Folder
        </button>

        <label> YOUR BOOKMARKS - Click on one to view its hashtags </label>
        <button
          onClick={() => handleShowAddBookmark()}
          style={{color: 'black'}}>
          Add Bookmark
        </button>

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

        {showAddFolder &&
          <form onSubmit={(event) => {handleAddFolder(event,newFolder);
                                      this.setState({ newFolder: '' }); } }>
            <h3>Add Folder</h3>
            <label>
              Name:
              <input 
                type="text" 
                value={newFolder} 
                onChange={ev => { this.setState({ newFolder: ev.target.value });}} 
              />
            </label>
            <input 
              type="submit" 
              value="Add"
              style={{color: 'black'}} 
            />
          </form>
        }

        {showAddBookmark &&
          <form onSubmit={(event) => {handleAddBookmark(event,newBookmarkInput,newURLInput,newHashtagsInput, newFolderInput);
                                      this.setState({ newBookmarkInput: '', newURLInput:'', newHashtagsInput:'',newFolderInput:''  }); } }>
            <h3>Add Bookmark</h3>
            <label>
              Name:
              <input 
                type="text" 
                value={newBookmarkInput} 
                onChange={ev => { this.setState({ newBookmarkInput: ev.target.value });}} 
              />
            </label>
            <label>
              URL:
              <input 
                type="text" 
                value={newURLInput}
                onChange={ev => { this.setState({ newURLInput: ev.target.value }); }} 
              />
            </label>
            <label>
              Hashtags:
              <input 
                type="text" 
                value={newHashtagsInput}
                onChange={ev => { this.setState({ newHashtagsInput: ev.target.value });}} 
              />
            </label>
            <label>
              Folder:
              <input 
                type="text" 
                value={newFolderInput}
                onChange={ev => { this.setState({ newFolderInput: ev.target.value });}} 
              />
            </label>
            <input 
              type="submit" 
              value="Add"
              style={{color: 'black'}} 
            />
          </form>
        }

      </div>
    );
  }

}

/*
BookmarkSelector.propTypes = {
  folders: PropTypes.array.isRequired,
  clickedFolder: PropTypes.object,
  handle: PropTypes.func.isRequired,
};
*/

export default BookmarkSelector;