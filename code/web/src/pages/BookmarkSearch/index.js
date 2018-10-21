import React from 'react';
import data from 'utils/consts';
import Navbar from 'components/Navbar';
import BookmarkSelector from 'components/BookmarkSelector';
import { getFolders, createFolder, deleteFolder, updateFolder, getBookmarks, createBookmark, updateBookmark, deleteBookmark } from 'utils/api';

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
          bookmarks: currentState.folders.concat([novoFolder]),
        };
      });
    });
  };

  handleBookmarkClick = (event,bookmark) => {
    event.preventDefault();
    if(this.state.clickedBookmark===bookmark)
      this.setState(currentState => {
        return {
          clickedBookmark: null,
        };
      });
    else
      this.setState(currentState => {
        return {
          clickedBookmark: bookmark,
        };
      });
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


  handleAddBookmark = (event,newBookmark,newHashtags, newURL) => {
    event.preventDefault();
    var hashtags = newHashtags.split(" ");
    //add # to hashtags if missing
    hashtags.forEach(function(element, index, array) {
      if(element.charAt(0)!=='#')
        array[index]='#'+element;
    });
    var postBookmark={
        name: newBookmark,
        interests:hashtags,
        //url:newURL,
    }
    //check if bookmark exists if yes update it
    var exists = this.state.bookmarks.filter(bookmark => bookmark.name===newBookmark);
    if(exists.length===1){
      updateBookmark(postBookmark, exists[0].id).then(res => {
        var novaBookmark=res.data;
        var indexOfUpdated = this.state.bookmarks.findIndex(bookmark => bookmark.name === newBookmark);
        var newBookmarks = this.state.bookmarks.slice();
        newBookmarks[indexOfUpdated] = novaBookmark;
        this.setState(currentState => {
          return {
            bookmarks: newBookmarks,
          };
        });
      });
    }
    else{ //add new bookmark
      createBookmark(postBookmark).then(res => {
        var novaBookmark=res.data;
        this.setState(currentState => {
          return {
            bookmarks: currentState.bookmarks.concat([novaBookmark]),
          };
        });
      });
    }
  };

  //
  render() {
    const { 
      bookmarks: Bookmarks, 
      clickedBookmark: ClickedBookmark,
      showAddBookmark: ShowAddBookmark,
      showAddFolder: ShowAddFolder,
    } = this.state;
    return(
      <div>
        <Navbar history={this.props.history} />

        <BookmarkSelector 
          bookmarks={Bookmarks}
          clickedBookmark={ClickedBookmark} 
          handleBookmarkClick={this.handleBookmarkClick}
          handleAddFolder={this.handleAddFolder}
          handleAddBookmark={this.handleAddBookmark}
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