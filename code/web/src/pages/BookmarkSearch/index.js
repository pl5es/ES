import React from 'react';
import data from 'utils/consts';
import Navbar from 'components/Navbar';
import BookmarkSelector from 'components/BookmarkSelector';
import { getMyBookmarks, createBookmark } from 'utils/api';
//import 'styles/search.css';

export default class BookmarkSearch extends React.Component {
  constructor(props) {
    super(props);
    //add toggled property to bookmarks
    data.BookmarkData.forEach(function(bookmark) { bookmark.toggled = false; });
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
        toggledBookmarks: currentState.bookmarks.filter(bookmark => bookmark.toggled===true),
      };
    });
  };


  handleBookmarkClick = (event,bookmark) => {
    event.preventDefault();
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
      interests:newHashtags,
    }
    //>>>>post da postBookmark<<<<
    //bastaria adicionar resultado do post às bookmarks com concat como em baixo
    //,nao esquecendo de adicionar propriedade toggled à bookmark,
    //mas nao estou a conseguir correr o servidor terá de ser assim por enquanto

    //enqt n corro servidor
    postBookmark={
      name: newBookmark,
      interests: [],
    }
    for(let i=0; i<hashtags.length; i++){
        postBookmark.interests.push({hashtag: hashtags[i]});
    }
    //END enqt n corro servidor

    postBookmark.toggled=false;
    this.setState(currentState => {
      return {
        bookmarks: currentState.bookmarks.concat([postBookmark]),
      };
    });
  };

  //
  render() {
    const { 
      bookmarks: Bookmarks, 
      toggledBookmarks: ToggledBookmarks, 
      clickedBookmark: ClickedBookmark,
      currInputBookmark: CurrInputBookmark,
      currInputHashtags: CurrInputHashtags,
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
              </label>
            ))}
        </label>

      </div>
    )
  }

}