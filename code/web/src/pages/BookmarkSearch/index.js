import React from 'react';
import data from 'utils/consts';
import Navbar from 'components/Navbar';
import BookmarkSelector from 'components/BookmarkSelector';
import { getFolder, getFolders, createFolder, deleteFolder, updateFolder, getBookmark, createBookmark, updateBookmark, deleteBookmark } from 'utils/api';

export default class BookmarkSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      clickedFolder:null,
      clickedBookmark: null,
      showAddFolder: false,
      showAddBookmark: false,
      bookmarks: data.BookmarkData,
      searchedBookmarks:[],
    };
  }

  componentDidMount() {
    getFolders().then(res => {
      this.setState({
        folders: res.data,
      });
      console.log(res.data);
    });
  };

  handleAddFolder = (event, newFolder) => {
    event.preventDefault();
    console.log(newFolder);
    var postFolder={
        title: newFolder,
    };
    createFolder(postFolder).then(res => {
      var novoFolder=res.data;
      console.log(res.data);
      this.setState(currentState => {
        return {
          folders: currentState.folders.concat([novoFolder]),
        };
      });
    });
  };

  handleAddBookmark = (event,newBookmark,newHashtags, newURL, newFolder) => {
    event.preventDefault();
    //check if folder exists
    var exists = this.state.folders.filter(folder => folder.title===newFolder);
    if(exists.length===0) //folder doesnt exist
      return;
    //add # to hashtags if missing
    var hashtags = newHashtags.split(" ");
    if(hashtags.length==0 || newBookmark.length===0 || newURL.length===0) //non empty pls
      return;
    hashtags.forEach(function(element, index, array) {
      if(element.charAt(0)!=='#')
        array[index]='#'+element;
    });
    //add http://www. if missing
    newURL = newURL.toLowerCase(); 
    var prefix = 'www.';
    if (newURL.substr(0, prefix.length) !== prefix){
        newURL = prefix + newURL;
    }
    prefix='http://';
    if (newURL.substr(0, prefix.length) !== prefix){
        newURL = prefix + newURL;
    }

    //-------------------
    var postBookmark={
        title: newBookmark,
        interests:hashtags,
        url:newURL,
    };
    createBookmark(postBookmark,exists[0].id).then(res => {
      getFolder(exists[0].id).then(res => {
        this.setState(currentState => {
          return {
            folders: [res.data].concat(currentState.folders.filter(folder => folder.title!==newFolder)),
          };
        });
      });
    });
  };

  handleDeleteFolder = (event,deletedFolder) => {
    var folderId=deletedFolder.id;
    event.preventDefault();
    deleteFolder(folderId).then(res => {
      this.setState(currentState => {
        return {
          folders: currentState.folders.filter(folder => folder.id!==folderId),
        };
      });
    });
  };

  handleDeleteBookmark = (event,bookmark) => {
    var bookmarkId=bookmark.id;
    var folderId=this.state.clickedFolder.id;
    event.preventDefault();
    deleteFolder(folderId,bookmarkId).then(res => {
      getFolder(folderId).then(res => {
        this.setState(currentState => {
          return {
            folders: [res.data].concat(currentState.folders.filter(folder => folder.id!==folderId)),
          };
        });
      });
    });
  };

  handleFolderClick = (event,folder) => {
    event.preventDefault();
    if(this.state.clickedFolder===folder)
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
  }

  handleBookmarkClick = (event,bookmark) => {
    event.preventDefault();
    var bookmarkId=bookmark.id;
    var folderId=this.state.clickedFolder.id;
    if(this.state.clickedBookmark!==null && this.state.clickedBookmark.id===bookmark.id){
      this.setState(currentState => {
        return {
          clickedBookmark: null,
        };
      });
    }
    else{
      getBookmark(folderId,bookmarkId).then(res => {
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

  handleBookmarkSearch = (event,hashtag) => {
    event.preventDefault();

    this.setState(currentState => {
      return {
        //searchedBookmarks: bookmarks.filter(bookmark => bookmark.interests===newBookmark),
      };
    });
  };

  //
  render() {
    const { 
      folders: Folders, 
      clickedFolder : ClickedFolder,
      clickedBookmark: ClickedBookmark,
      showAddBookmark: ShowAddBookmark,
      showAddFolder: ShowAddFolder,
    } = this.state;
    return(
      <div>
        <Navbar history={this.props.history} />

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

          handleSearchBookmark={this.handleSearchBookmark}

          showAddBookmark={ShowAddBookmark}
          showAddFolder={ShowAddFolder}
          handleShowAddBookmark={this.handleShowAddBookmark}
          handleShowAddFolder={this.handleShowAddFolder}
        />

      </div>
    )
  }

}