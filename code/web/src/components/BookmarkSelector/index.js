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
        folders, 

        clickedFolder,
        clickedBookmark, 
        handleFolderClick,
        handleBookmarkClick,

        searchResults,
        showSearchResults,
        handleSearchBookmark,
        handleCloseSearchResults, 

        handleAddFolder, 
        handleAddBookmark,
        handleDeleteFolder,
        handleDeleteBookmark,

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
        <label>SEARCH BOOKMARKS - Search bookmarks in folders by hashtag</label>
        <form onSubmit={(event) => {handleSearchBookmark(event,searchInput);
                                     } }>
          <label>
            <input 
              type="text" 
              value={searchInput}
              onChange={ev => { this.setState({ searchInput: ev.target.value });}} 
            />
            <input 
              type="submit" 
              value="Search"
              style={{color: 'black'}} 
            />
          </label>
        </form>

        {showSearchResults && 
          <label>
            {"Search Results:"}
            <button
              onClick={() => handleCloseSearchResults()}
              style={{color: 'black'}}>
              (Close Search)
            </button>

            {searchResults.map(bookmark => (
              <label key={bookmark.id}>
                {bookmark.title}
                <a href={bookmark.url} target="_blank">OPEN LINK</a>
              </label>
            ))}
          </label>
        }


        <button
          onClick={() => handleShowAddFolder()}
          style={{color: 'black'}}>
          (Add Folder)
        </button>
        
        <button
          onClick={() => handleShowAddBookmark()}
          style={{color: 'black'}}>
          (Add Bookmark)
        </button>


        <label> YOUR FOLDERS - Click on one to view its bookmarks </label>

        <label id="folders">
          {folders.map(folder => (
            <label key={folder.id}>
              <button
                onClick={(event) => handleFolderClick(event,folder)}
                style={{color: 'black'}}>
                {folder.title}
              </button>
              <button
                onClick={(event) => handleDeleteFolder(event,folder)}
                style={{color: 'black'}}>
                Delete
              </button>
            </label>
          ))}
        </label>

        {clickedFolder!=null &&
          <label id="bookmarks">
            {clickedFolder.title + "'s bookmarks are: (Click on one to view its interests)"}
            {clickedFolder.bookmarks.map(bookmark => (
              <label key={bookmark.id}>
                <button
                  onClick={(event) => handleBookmarkClick(event,bookmark)}
                  style={{color: 'black'}}>
                  {bookmark.title}
                </button>
                <a href={bookmark.url} target="_blank">OPEN LINK</a>
                <button
                  onClick={(event) => handleDeleteBookmark(event,bookmark)}
                  style={{color: 'black'}}>
                  Delete
                </button>
              </label>
            ))}
          </label>
        }

        {clickedBookmark!=null && 
          <label id="interests">
            {clickedBookmark.title + "'s hashtags are:"}
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
          <form onSubmit={(event) => {handleAddBookmark(event,newBookmarkInput,newHashtagsInput,newURLInput, newFolderInput);
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

export default BookmarkSelector;