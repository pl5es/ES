import React from 'react';
import Navbar from 'components/Navbar';
import NewsFeed from 'components/NewsFeed';
import CreatePost from 'components/CreatePost';
import 'styles/feed.css';
import { tweets } from 'utils/consts';
import { getTweets } from 'utils/api';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      search_results: [],
    };

    getTweets(20)
      .then(data => {
        // remover duplicados
        const ids = Array.from(new Set(data.data));
        this.setState({
          news: ids,
        });
      })
      .catch(console.log);
  }

  handleNewPost = values => {
    if (!values) {
      return;
    }
    this.setState(currentState => {
      var newPost = {
        title: `My post from ${Date().toLocaleString()}`,
        desc: values,
        src: '',
      };
      return {
        news: [newPost].concat(currentState.news),
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
          _new.title.toLowerCase().includes(values.toLowerCase()),
        ),
      };
    });
  };

  render() {
    const { search_results: SearchResults, news: NewsResults } = this.state;
    return (
      <div id="Feed">
        <img
          id="bg"
          alt="background"
          src={require('assets/register_bg_Prancheta 1.png')}
        />
        <img
          id="logofeed"
          alt="logo"
          src={require('assets/pando_logotipo.png')}
        />
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
          <NewsFeed news={NewsResults} name="News Feed" />
        </div>
      </div>
    );
  }
}
