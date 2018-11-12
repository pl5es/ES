import React from "react";
import Navbar from "components/Navbar";
import NewsFeed from "components/NewsFeed";
import CreatePost from "components/CreatePost";
import { getTweets, getRedditPost, getMyInfo } from "utils/api";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      posts: [],
      search_results: [],
    };
  }

  componentDidMount() {
    this.addRedditPosts();
    this.addTweets();
  }

  addTweets = () => {
    getTweets(20)
      .then(data => {
        // remover duplicados
        const ids = Array.from(new Set(data.data));
        this.setState({
          news: ids,
        });
      })
      .catch(console.log);
  };

  addRedditPosts = () => {
    getMyInfo().then(response => {
      var interests = response.data.interests;
      interests.forEach(interest => {
        var subreddit;
        //get subreddit from interest (remove # if included)
        interest.hashtag[0] == "#"
          ? (subreddit = interest.hashtag.slice(1))
          : (subreddit = interest.hashtag);
        this.getLastestSubredditPost(subreddit);
      });
    });
  };

  getLastestSubredditPost = subreddit => {
    getRedditPost(subreddit).then(response => {
      var newPost = response.data.data.children[0].data;
      this.setState(currentState => {
        return {
          posts: currentState.posts.concat([newPost])
        };
      });
    });
  };

  handleNewPost = values => {
    if (!values) {
      return;
    }
    this.setState(currentState => {
      var newPost = {
        title: `My post from ${Date().toLocaleString()}`,
        desc: values,
        src: ""
      };
      return {
        news: [newPost].concat(currentState.news)
      };
    });
  };

  handleSearch = values => {
    if (!values.search) {
      return;
    }
    this.setState(currentState => {
      return {
        search_results: currentState.news.filter(_new =>
          _new.title.toLowerCase().includes(values.toLowerCase())
        )
      };
    });
  };

  render() {
    const {
      search_results: SearchResults,
      news: NewsResults,
      posts: PostsResult
    } = this.state;
    return (
      <div class="container">
        <Navbar
          id="feednavbar"
          history={this.props.history}
          search={this.handleSearch}
        />
        <CreatePost post={this.handleNewPost} />
        <div id="SearchResults">
          <NewsFeed news={SearchResults} name="Search Results" />
        </div>
        <div id="NewsFeed">
          <NewsFeed news={NewsResults} posts={PostsResult} name="News Feed" />
        </div>
      </div>
    );
  }
}
