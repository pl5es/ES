import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookmarkSelector extends Component {
  state = {
    searchInput: '',
    newFolder: '',
    newBookmarkInput: '',
    newURLInput: '',
    newHashtagsInput: '',
    newFolderInput: '',

    updatedBookmarkInput:'',
    updatedURLInput:'',
    updatedHashtagsInput:'',
    updatedFolderInput:'',
  };

  render() {
    const {
      props: {
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

        handleDeleteFolder,
        handleDeleteBookmark,

        showAddFolder,
        showAddBookmark,
        handleShowAddBookmark,
        handleShowAddFolder,
        handleAddFolder,
        handleAddBookmark,

        errorMessage,
        showErrorMessage,
        handleErrorMessage,

        showEditBookmark,
        handleShowEditBookmark,
        handleEditBookmark,
        toBeEditedBookmark,
        toBeEditedBookmarkFolder,
      },
      state: {
        newFolder,
        newBookmarkInput,
        newURLInput,
        newHashtagsInput,
        newFolderInput,
        searchInput,

        updatedBookmarkInput,
        updatedURLInput,
        updatedHashtagsInput,
        updatedFolderInput,
      },
    } = this;
    return (
      <div>
        {/*Search Bar*/}
        <label>
          <b>SEARCH BOOKMARKS</b> in folders by hashtag
        </label>
        <form
          onSubmit={event => {
            handleSearchBookmark(event, searchInput);
            this.setState({ searchInput: '' });
          }}
        >
          <label>
            <input
              type="text"
              value={searchInput}
              onChange={ev => {
                this.setState({ searchInput: ev.target.value });
              }}
            />
            <input type="submit" value="Search" style={{ color: 'black' }} />
          </label>
        </form>

        {/*Search Results*/}
        {showSearch && (
          <p>
            {'Search Results:'}
            <button
              onClick={() => handleShowSearchResults()}
              style={{ color: 'black' }}
            >
              {!showSearchResults && 'Show Results'}
              {showSearchResults && 'Hide Results'}
            </button>

            <button
              onClick={() => handleCloseSearchResults()}
              style={{ color: 'black' }}
            >
              (Close)
            </button>

            <ul>
              {showSearchResults &&
                searchResults.map(bookmark => (
                  <li key={bookmark.id}>
                    {bookmark.title}
                    &#160;&#160;&#160;
                    {/*espaços em branco*/}
                    <a href={bookmark.url} target="_blank">
                      OPEN LINK
                    </a>
                    &#160;&#160;&#160;
                    {/*espaços em branco*/}
                    {`(In folder: ${
                      bookmark.folderName
                    } with matching hashtag:${bookmark.matchingHashtag})`}
                  </li>
                ))}
            </ul>
          </p>
        )}

        <div className="cntntRow">
          <div className="cntntColumn">
            <label> Your folders - Click on one to view its bookmarks </label>
            {/*Shows folders*/}
            <ul id="cntnList">
              {folders.map(folder => (
                <li key={folder.id}>
                  <button
                    onClick={event => handleFolderClick(event, folder)}
                    style={{ color: 'black' }}
                  >
                    {folder.title}
                  </button>
                  <button
                    onClick={event => handleDeleteFolder(event, folder)}
                    style={{ color: 'black' }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="cntntColumn">
            {/*Shows bookmarks of folder you clicked on*/}
            {clickedFolder != null && (
              <ul id="cntnList">
                {`${
                  clickedFolder.title
                } 's bookmarks: Click on one to view its interests`}
                {clickedFolder.bookmarks.map(bookmark => (
                  <li key={bookmark.id}>
                    <button
                      onClick={event => handleBookmarkClick(event, bookmark)}
                      style={{ color: 'black' }}
                    >
                      {bookmark.title}
                    </button>
                    <a href={bookmark.url} target="_blank">
                      OPEN LINK
                    </a>
                    <button
                      onClick={event => handleDeleteBookmark(event, bookmark)}
                      style={{ color: 'black' }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={event => handleShowEditBookmark(bookmark,clickedFolder)}
                      style={{ color: 'black' }}
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="cntntColumn">
            {/*Shows interests of bookmark you clicked on*/}
            {clickedBookmark != null && (
              <ul id="cntnList">
                {`${clickedBookmark.title}'s hashtags are:`}
                {clickedBookmark.interests.map(interest => (
                  <li key={interest.id}>{interest.hashtag}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/*Show add folder form*/}
        <button
          onClick={() => handleShowAddFolder()}
          style={{ backgroundColor: showAddFolder }}
        >
          Add Folder
        </button>
        {/*Show add bookmark form*/}
        <button
          onClick={() => handleShowAddBookmark()}
          style={{ backgroundColor: showAddBookmark }}
        >
          Add Bookmark
        </button>

        {/*Error message*/}
        {showErrorMessage && (
          <p style={{ color: 'red' }}><b>
            Error: {errorMessage}
          </b>
            <button
              onClick={() => handleErrorMessage(false,'')}
              style={{ color: 'black' }}
            >
              Hide
            </button>
          </p>
          
        )}

        {/* Add folder form*/}
        {showAddFolder==='#cccccc' && ( //changed from true/false to color if true/color if false
          <form
            onSubmit={event => {
              handleAddFolder(event, newFolder);
              this.setState({ newFolder: '' });
            }}
          >
            <h3>Add Folder</h3>
            <label>
              Name:
              <input
                type="text"
                value={newFolder}
                onChange={ev => {
                  this.setState({ newFolder: ev.target.value });
                }}
              />
            </label>
            <input type="submit" value="Add" style={{ color: 'black' }} />
          </form>
        )}

        {/* Add bookmark form*/}
        {showAddBookmark==='#cccccc' && ( //changed from true/false to color if true/color if false
          <form
            onSubmit={event => {
              handleAddBookmark(
                event,
                newBookmarkInput,
                newHashtagsInput,
                newURLInput,
                newFolderInput,
              );
              this.setState({
                newBookmarkInput: '',
                newURLInput: '',
                newHashtagsInput: '',
                newFolderInput: '',
              });
            }}
          >
            <h3>Add Bookmark</h3>
            <label>
              Name:
              <input
                type="text"
                value={newBookmarkInput}
                onChange={ev => {
                  this.setState({ newBookmarkInput: ev.target.value });
                }}
              />
            </label>
            <label>
              URL:
              <input
                type="text"
                value={newURLInput}
                onChange={ev => {
                  this.setState({ newURLInput: ev.target.value });
                }}
              />
            </label>
            <label>
              Hashtags:
              <input
                type="text"
                value={newHashtagsInput}
                onChange={ev => {
                  this.setState({ newHashtagsInput: ev.target.value });
                }}
              />
            </label>
            <label>
              Folder:
              <input
                type="text"
                value={newFolderInput}
                onChange={ev => {
                  this.setState({ newFolderInput: ev.target.value });
                }}
              />
            </label>
            <input type="submit" value="Add" style={{ color: 'black' }} />
          </form>
        )}

        {/* Edit bookmark form*/}
        {showEditBookmark && (
          <form
            onSubmit={event => {
              handleEditBookmark(
                event,
                updatedBookmarkInput,
                updatedHashtagsInput,
                updatedURLInput,
                updatedFolderInput,
              );
              this.setState({
                updatedBookmarkInput: '',
                updatedURLInput: '',
                updatedHashtagsInput: '',
                updatedFolderInput: '',
              });
            }}
          >
            <h3>Edit bookmark {toBeEditedBookmark.title} in folder {toBeEditedBookmarkFolder.title}...</h3>
            <p>Leave empty fields to keep current value</p>
            <label>
              New name:
              <input
                type="text"
                value={updatedBookmarkInput}
                onChange={ev => {
                  this.setState({ updatedBookmarkInput: ev.target.value });
                }}
              />
            </label>
            <label>
              New URL:
              <input
                type="text"
                value={updatedURLInput}
                onChange={ev => {
                  this.setState({ updatedURLInput: ev.target.value });
                }}
              />
            </label>
            <label>
              New hashtags:
              <input
                type="text"
                value={updatedHashtagsInput}
                onChange={ev => {
                  this.setState({ updatedHashtagsInput: ev.target.value });
                }}
              />
            </label>
            <label>
              New folder:
              <input
                type="text"
                value={updatedFolderInput}
                onChange={ev => {
                  this.setState({ updatedFolderInput: ev.target.value });
                }}
              />
            </label>
            <input type="submit" value="Edit" style={{ color: 'black' }} />
          </form>
        )}

      </div>
    );
  }
}

export default BookmarkSelector;
