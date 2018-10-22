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
        showSearch,
        showSearchResults,
        handleSearchBookmark,
        handleCloseSearchResults, 
        handleShowSearchResults,

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
        {/*Search Bar*/}
        <label>SEARCH BOOKMARKS - Search bookmarks in folders by hashtag</label>
        <form onSubmit={(event) => {handleSearchBookmark(event,searchInput);
                                    this.setState({ searchInput: '' }); } }>
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

        {/*Search Results*/}
        {showSearch && 
          <label>
            {"Search Results:"}
            <button
              onClick={() => handleShowSearchResults()}
              style={{color: 'black'}}>
              {!showSearchResults && "Show Results"}
              {showSearchResults && "Hide Results"}
            </button>

            <button
              onClick={() => handleCloseSearchResults()}
              style={{color: 'black'}}>
              (Close)
            </button>

            {showSearchResults && searchResults.map(bookmark => (
              <label key={bookmark.id}>
                {bookmark.title}
                &#160;&#160;&#160;{/*espaços em branco*/}
                <a href={bookmark.url} target="_blank">OPEN LINK</a>
                &#160;&#160;&#160;{/*espaços em branco*/}
                {"(In folder: "+bookmark.folderName+" with matching hashtag:"+bookmark.matchingHashtag+")"}

              </label>
            ))}
          </label>
        }

        {/*Show add folder form*/}
        <button
          onClick={() => handleShowAddFolder()}
          style={{color: 'black'}}>
          (Add Folder)
        </button>
        {/*Show add bookmark form*/}
        <button
          onClick={() => handleShowAddBookmark()}
          style={{color: 'black'}}>
          (Add Bookmark)
        </button>


        <label> YOUR FOLDERS - Click on one to view its bookmarks </label>
        {/*Shows folders*/}
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

        {/*Shows bookmarks of folder you clicked on*/}
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

        {/*Shows interests of bookmark you clicked on*/}
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


        {/* Add folder form*/}
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


        {/* Add bookmark form*/}
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