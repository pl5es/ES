import React from 'react';
import data from 'utils/consts';
import Navbar from 'components/Navbar';
import BookmarkSelector from 'components/BookmarkSelector';
import { getMyBookmarks, createBookmark, updateBookmark } from 'utils/api';
//import 'styles/search.css';

export default class BookmarkSearch extends React.Component {
  constructor(props) {
    super(props);
    //add toggled property to bookmarks
    //data.BookmarkData.forEach(function(bookmark) { bookmark.toggled = false; });
    this.state = {
      bookmarks: data.BookmarkData,
      toggledBookmarks: [],
      clickedBookmark: null,
    };
  }

  componentDidMount() {
    getMyBookmarks().then(res => {
      //add toggled property to bookmarks
      res.data.forEach(function(bookmark) { bookmark.toggled = false; });
      this.setState({
        bookmarks: res.data,
      });
      console.log(res.data);
    });
  }

  handleBookmarkToggle = event => {
    const value = event.target.checked;
    const name = event.target.name;

    var indexOfToggled = this.state.bookmarks.findIndex(bookmark => bookmark.name === name);
    var newBookmarks = this.state.bookmarks.slice();
    newBookmarks[indexOfToggled].toggled = value;

    this.setState(currentState => {
      return {
        bookmark: newBookmarks,
        toggledBookmarks: newBookmarks.filter(bookmark => bookmark.toggled===true),
      };
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

  handleAddBookmark = (event,newBookmark,newHashtags) => {
    event.preventDefault();
    var hashtags = newHashtags.split(" ");
    var postBookmark={
        name: newBookmark,
        interests:hashtags,
    }
    //check if bookmark exists if yes update it
    var exists = this.state.bookmarks.filter(bookmark => bookmark.name===newBookmark);
    if(exists.length==1){
      updateBookmark(postBookmark, exists[0].id).then(res => {
        var novaBookmark=res.data;
        novaBookmark.toggled=false;
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
        novaBookmark.toggled=false;
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
      toggledBookmarks: ToggledBookmarks, 
      clickedBookmark: ClickedBookmark,
    } = this.state;
    return(
      <div>
        <Navbar history={this.props.history} />

        <BookmarkSelector 
          bookmarks={Bookmarks}
          clickedBookmark={ClickedBookmark} 
          handleBookmarkToggle={this.handleBookmarkToggle} 
          handleBookmarkClick={this.handleBookmarkClick}
          handleAddBookmark={this.handleAddBookmark}
        />

        <label>
            {"Debugging current state of selected bookmarks"}
            {ToggledBookmarks.map(toggled => (
              <label key={toggled.id}>
                {toggled.name},
                {toggled.interests.map(hashtag => (
                  <label key={hashtag.id}>
                    #{hashtag.hashtag},
                  </label>
                ))}
              </label>
            ))}
        </label>

      </div>
    )
  }

}