import React from 'react';
import Navbar from 'components/Navbar';
import BookmarkSelector from 'components/BookmarkSelector';
import {
  getFolder,
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from 'utils/api';
import 'styles/bookmarks.css';

export default class BookmarkSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      clickedFolder: null,
      clickedBookmark: null,
      showAddFolder: false,
      showAddBookmark: false,
      showSearchResults: false,
      showSearch: false,
      bookmarks: [],
      searchResults: [],
    };
  }

  componentDidMount() {
    getFolders().then(res => {
      this.setState({
        folders: res.data,
      });
      console.log(res.data);
    });
  }

  handleAddFolder = (event, newFolder) => {
    event.preventDefault();
    if (newFolder.length === 0) return;
    this.handleCloseSearchResults();
    console.log(newFolder);
    var postFolder = {
      title: newFolder,
    };
    createFolder(postFolder).then(res => {
      var novoFolder = res.data;
      console.log(res.data);
      this.setState(currentState => {
        return {
          folders: currentState.folders.concat([novoFolder]),
        };
      });
    });
  };

  handleAddBookmark = (event, newBookmark, newHashtags, newURL, newFolder) => {
    event.preventDefault();
    this.handleCloseSearchResults();
    //check if folder exists
    var exists = this.state.folders.filter(
      folder => folder.title === newFolder,
    );
    if (exists.length === 0)
      //folder doesnt exist
      return;
    //add # to hashtags if missing
    var hashtags = newHashtags.split(' ');
    if (
      hashtags.length === 0 ||
      newBookmark.length === 0 ||
      newURL.length === 0
    )
      //non empty pls
      return;
    hashtags.forEach((element, index, array) => {
      if (element.charAt(0) !== '#') array[index] = `#${element}`;
    });
    //add http://www. if missing
    newURL = newURL.toLowerCase();
    var prefix = 'www.';
    if (newURL.substr(0, prefix.length) !== prefix) {
      newURL = prefix + newURL;
    }
    prefix = 'http://';
    if (newURL.substr(0, prefix.length) !== prefix) {
      newURL = prefix + newURL;
    }

    //-------------------
    var postBookmark = {
      title: newBookmark,
      interests: hashtags,
      url: newURL,
    };
    createBookmark(postBookmark, exists[0].id).then(res => {
      getFolder(exists[0].id).then(res => {
        this.setState(currentState => {
          return {
            folders: [res.data].concat(
              currentState.folders.filter(folder => folder.title !== newFolder),
            ),
          };
        });
        this.handleFolderClick(event, res.data);
      });
    });
  };

  handleDeleteFolder = (event, deletedFolder) => {
    this.handleCloseSearchResults();
    if (this.state.clickedFolder != null)
      this.handleFolderClick(event, this.state.clickedBookmark);
    var folderId = deletedFolder.id;
    event.preventDefault();
    deleteFolder(folderId).then(res => {
      this.setState(currentState => {
        return {
          folders: currentState.folders.filter(
            folder => folder.id !== folderId,
          ),
        };
      });
    });
  };

  handleDeleteBookmark = (event, bookmark) => {
    this.handleCloseSearchResults();
    var bookmarkId = bookmark.id;
    var folderId = this.state.clickedFolder.id;
    event.preventDefault();
    deleteBookmark(folderId, bookmarkId).then(res => {
      getFolder(folderId).then(res => {
        this.setState(currentState => {
          return {
            folders: [res.data].concat(
              currentState.folders.filter(folder => folder.id !== folderId),
            ),
          };
        });
        this.handleFolderClick(event, res.data);
      });
    });
  };

  handleFolderClick = (event, folder) => {
    if (this.state.clickedBookmark !== null)
      this.handleBookmarkClick(event, this.state.clickedBookmark);
    event.preventDefault();
    if (this.state.clickedFolder === folder)
      this.setState(currentState => {
        return {
          clickedFolder: null,
        };
      });
    else
      this.setState(currentState => {
        return {
          clickedFolder: folder,
        };
      });
  };

  handleBookmarkClick = (event, bookmark) => {
    event.preventDefault();
    var bookmarkId = bookmark.id;
    var folderId = this.state.clickedFolder.id;
    if (
      this.state.clickedBookmark !== null &&
      this.state.clickedBookmark.id === bookmark.id
    ) {
      this.setState(currentState => {
        return {
          clickedBookmark: null,
        };
      });
    } else {
      getBookmark(folderId, bookmarkId).then(res => {
        console.log(res.data);
        this.setState({
          clickedBookmark: res.data,
        });
      });
    }
  };

  handleShowAddFolder = () => {
    this.setState(currentState => {
      return {
        showAddFolder: !currentState.showAddFolder,
      };
    });
  };

  handleShowAddBookmark = () => {
    this.setState(currentState => {
      return {
        showAddBookmark: !currentState.showAddBookmark,
      };
    });
  };

  handleSearchBookmark = (event, keywords) => {
    event.preventDefault();
    //add # to hashtags if missing
    if (keywords === '') return;
    var hashtags = keywords.split(' ');
    hashtags.forEach((element, index, array) => {
      if (element.charAt(0) !== '#') array[index] = `#${element}`;
    });

    var bookmarks = [];
    var folders = this.state.folders;
    folders.forEach(folder => {
      folder.bookmarks.forEach(bookmark => {
        getBookmark(folder.id, bookmark.id).then(res => {
          res.data.interests.forEach(interest => {
            if (
              hashtags.includes(interest.hashtag) &&
              !bookmarks.includes(bookmark)
            ) {
              bookmark.folderName = folder.title;
              bookmark.matchingHashtag = interest.hashtag;
              bookmarks.push(bookmark);
            }
          });
        });
      });
    });
    this.setState({
      searchResults: bookmarks,
      showSearchResults: false,
      showSearch: true,
    });
  };

  handleShowSearchResults = () => {
    this.setState(currentState => {
      return {
        showSearchResults: !currentState.showSearchResults,
      };
    });
  };

  handleCloseSearchResults = () => {
    this.setState(currentState => {
      return {
        showSearch: false,
      };
    });
  };

  //
  render() {
    const {
      folders: Folders,
      clickedFolder: ClickedFolder,
      clickedBookmark: ClickedBookmark,
      showAddBookmark: ShowAddBookmark,
      showAddFolder: ShowAddFolder,
      searchResults: SearchResults,
      showSearch: ShowSearch,
      showSearchResults: ShowSearchResults,
    } = this.state;
    return (
      <div className="container">
        <Navbar history={this.props.history} />
        <p id="header">
          {' '}
          <b> YOUR BOOKMARKS </b>
{' '}
        </p>
        <BookmarkSelector
          folders={Folders}
          clickedFolder={ClickedFolder}
          clickedBookmark={ClickedBookmark}
          handleFolderClick={this.handleFolderClick}
          handleBookmarkClick={this.handleBookmarkClick}
          handleAddFolder={this.handleAddFolder}
          handleAddBookmark={this.handleAddBookmark}
          handleDeleteFolder={this.handleDeleteFolder}
          handleDeleteBookmark={this.handleDeleteBookmark}
          handleShowSearchResults={this.handleShowSearchResults}
          handleCloseSearchResults={this.handleCloseSearchResults}
          searchResults={SearchResults}
          showSearch={ShowSearch}
          showSearchResults={ShowSearchResults}
          handleSearchBookmark={this.handleSearchBookmark}
          showAddBookmark={ShowAddBookmark}
          showAddFolder={ShowAddFolder}
          handleShowAddBookmark={this.handleShowAddBookmark}
          handleShowAddFolder={this.handleShowAddFolder}
        />
      </div>
    );
  }
}
