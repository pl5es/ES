import React from 'react';
import { Formik, Form, Field } from 'formik';
import NewsData from 'utils/consts';
import NewsFeed from 'components/NewsFeed';
import 'styles/feed.css';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _news: NewsData,
      search_results: [],
    };
  }

  handleNewPost = values => {
    this.setState(currentState => {
      var newPost = {
        title: `My post from ${Date().toLocaleString()}`,
        desc: values.post,
        src: '',
      };
      return {
        _news: [newPost].concat(currentState._news),
      };
    });
  };

  handleSearch = values => {
    if (!values.search) {
      return;
    }
    this.setState(currentState => {
      return {
        search_results: currentState._news.filter(_new =>
          _new.title.toLowerCase().includes(values.search.toLowerCase()),
        ),
      };
    });
  };

  render() {
    const { search_results: SearchResults, _news: NewsResults } = this.state;
    return (
      <div id="Feed">
        <div id="Search">
          <Formik
            initialValues={{ search: '' }}
            onSubmit={values => this.handleSearch(values)}
          >
            <Form>
              <Field type="text" name="search" placeholder="Search news..." />
              <button type="submit">Search</button>
            </Form>
          </Formik>
        </div>
        <div id="NewPost">
          <Formik
            initialValues={{ post: '' }}
            onSubmit={values => this.handleNewPost(values)}
          >
            <Form>
              <Field type="text" name="post" placeholder="Write new post..." />
              <button type="submit">Publish</button>
            </Form>
          </Formik>
        </div>
        <div id="SearchResults">
          <NewsFeed _news={SearchResults} nome="Search Results" />
        </div>
        <div id="NewsFeed">
          <NewsFeed _news={NewsResults} nome="News Feed" />
        </div>
      </div>
    );
  }
}
