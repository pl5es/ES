import React from 'react';
import data from 'utils/consts';
import Navbar from 'components/Navbar';
import BookmarkSelector from 'components/BookmarkSelector';
//import 'styles/search.css';

export default class BookmarkSearch extends React.Component {
  constructor(props) {
    super(props);
    //add toggled property to bookmarks
    data.BookmarkData.forEach(function(bookmark) { bookmark.toggled = false; });
    this.state = {
      bookmarks: data.BookmarkData,
      toggledBookmarks: [],
      selectedBookmark: null,
      currInputBookmark: '',
      currInputHashtags: '',
    };
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
        toggledBookmarks: currentState.bookmarks.filter(bookmark => bookmark.toggled===true),
      };
    });
  };

  handleBookmarkClick = (event,bookmark) => {
    event.preventDefault();
    this.setState(currentState => {
      return {
        selectedBookmark: bookmark,
      };
    });
  };

  handleAddBookmark = (event,newBookmark,newHashtags) => {
    event.preventDefault();
    var hashtags = newHashtags.split(" ");
    console.log(newBookmark);
    console.log(hashtags);
  };

  //
  render() {
    const { 
      bookmarks: Bookmarks, 
      toggledBookmarks: ToggledBookmarks, 
      selectedBookmark: SelectedBookmark,
      currInputBookmark: CurrInputBookmark,
      currInputHashtags: CurrInputHashtags,
    } = this.state;
    return(
      <div>
        <Navbar history={this.props.history} />

        <BookmarkSelector 
          bookmarks={Bookmarks}
          selectedBookmark={SelectedBookmark} 
          handleBookmarkToggle={this.handleBookmarkToggle} 
          handleBookmarkClick={this.handleBookmarkClick}
          handleAddBookmark={this.handleAddBookmark}
        />

        <label>
            {"Debugging current state of selected bookmarks"}
            {ToggledBookmarks.map(toggled => (
              <label key={toggled.id}>
                {toggled.name},
              </label>
            ))}
        </label>
      </div>
    )
  }

}