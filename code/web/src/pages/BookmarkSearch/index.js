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
      errorMessage:'',
      showErrorMessage:false,
      showEditBookmark: false,
      toBeEditedBookmark:null,
      toBeEditedBookmarkFolder:null,
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
    if (newFolder.length === 0){
      this.handleErrorMessage(true,"Non empty name please!");
      return;
    }

    this.handleCloseSearchResults();
    var postFolder = {
      title: newFolder,
    };
    createFolder(postFolder).then(res => {
      var novoFolder = res.data;
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
    if (exists.length === 0){
      this.handleErrorMessage(true,"Folder does not exist!");
      return;
    }

    //add # to hashtags if missing
    var hashtags = newHashtags.split(' ');
    if (
      hashtags.length === 0 ||
      newBookmark.length === 0 ||
      newURL.length === 0
    ){
      this.handleErrorMessage(true,"Non empty values please!");
      return;
    }
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
              currentState.folders.filter(folder => folder.id !== exists[0].id),
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
    //hide clicked bookmark
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

  //functional spaghetti/tagliatelle/tortellini/linguini/...
  handleEditBookmark = (event, newBookmark, newHashtags, newURL, newFolder) => {
    event.preventDefault();
    this.handleCloseSearchResults();
    var editedBookmarkFolder = this.state.toBeEditedBookmarkFolder;

    //use old value if not inputted
    if(newFolder.length === 0)
      newFolder = editedBookmarkFolder.title;
    else{//otherwisse check if folder inputted exists
      var exists = this.state.folders.filter(
        folder => folder.title === newFolder,
      );
      if (exists.length === 0){
        this.handleErrorMessage(true,"New folder does not exist!");
        return;
      }
    }

    //use old value if not inputted
    if(newBookmark.length === 0)
      newBookmark = this.state.toBeEditedBookmark.title;

    //use old value if not inputted
    if(newURL.length === 0)
      newURL = this.state.toBeEditedBookmark.url;
    else{ //add http://www. if missing
      newURL = newURL.toLowerCase();
      var prefix = 'www.';
      if (newURL.substr(0, prefix.length) !== prefix) {
        newURL = prefix + newURL;
      }
      prefix = 'http://';
      if (newURL.substr(0, prefix.length) !== prefix) {
        newURL = prefix + newURL;
      }
    }

    //get edited bookmark full info (need interests in case user leaves them blank)
    getBookmark(editedBookmarkFolder.id, this.state.toBeEditedBookmark.id).then(res => {
      var editedBookmark = res.data;

      var hashtags =[];
      //use old value if not inputted
      if(newHashtags.length === 0){
        editedBookmark.interests.forEach((element, index, array) => {
          hashtags.push(element.hashtag);
        });
      }else{
        //add # to hashtags if missing
        hashtags = newHashtags.split(' ');
        hashtags.forEach((element, index, array) => {
          if (element.charAt(0) !== '#') array[index] = `#${element}`;
        });
      }

      var postBookmark = {
        title: newBookmark,
        interests: hashtags,
        url: newURL,
      };

      // same folder
      if(newFolder === editedBookmarkFolder.title){
        updateBookmark(postBookmark, editedBookmarkFolder.id,editedBookmark.id).then(res => {
          getFolder(editedBookmarkFolder.id).then(res => {
            this.setState(currentState => {
              return {
                folders: [res.data].concat(
                  currentState.folders.filter(folder => folder.id !== editedBookmarkFolder.id),
                ),
              };
            });
            this.handleFolderClick(event, res.data);
          });
        });
      }else{ // move to different folder (delete then add to that folder)
        deleteBookmark(editedBookmarkFolder.id, editedBookmark.id).then(res => {
          createBookmark(postBookmark, exists[0].id).then(res => {
            //update old folder in state
            getFolder(editedBookmarkFolder.id).then(res => {
              this.setState(currentState => {
                return {
                  folders: [res.data].concat(
                    currentState.folders.filter(folder => folder.id !== editedBookmarkFolder.id),
                  ),
                };
              });
            });
            //update new folder state
            getFolder(exists[0].id).then(res => {
              this.setState(currentState => {
                return {
                  folders: [res.data].concat(
                    currentState.folders.filter(folder => folder.id !== exists[0].id),
                  ),
                };
              });
              this.handleFolderClick(event, res.data);
            });
          });
        });
      }
      // hide edit input
      this.handleShowEditBookmark(this.state.toBeEditedBookmark,this.state.toBeEditedBookmarkFolder);
    });
    //sorry for pasta code
  };

  handleShowEditBookmark = (bookmark,folder) => {
    this.setState(currentState => {
      return {
        showEditBookmark: bookmark!=currentState.toBeEditedBookmark ? true : !currentState.showEditBookmark,
        toBeEditedBookmark: bookmark,
        toBeEditedBookmarkFolder: folder,
      };
    });
  };

  handleSearchBookmark = (event, keywords) => {
    event.preventDefault();
    //add # to hashtags if missing
    if (keywords === ''){
      this.handleErrorMessage(true,"Non empty search please!");
      return;
    } 
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

  handleErrorMessage = (show, message) => {
    this.setState(currentState => {
      return {
        showErrorMessage:show,
        errorMessage:message,
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

      errorMessage:ErrorMessage,
      showErrorMessage:ShowErrorMessage,

      showEditBookmark: ShowEditBookmark,
      toBeEditedBookmark: ToBeEditedBookmark,
      toBeEditedBookmarkFolder: ToBeEditedBookmarkFolder,
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

          errorMessage={ErrorMessage}
          showErrorMessage={ShowErrorMessage}
          handleErrorMessage={this.handleErrorMessage}

          showEditBookmark={ShowEditBookmark}
          handleEditBookmark={this.handleEditBookmark}
          handleShowEditBookmark={this.handleShowEditBookmark}
          toBeEditedBookmark={ToBeEditedBookmark}
          toBeEditedBookmarkFolder={ToBeEditedBookmarkFolder}
        />
      </div>
    );
  }
}
