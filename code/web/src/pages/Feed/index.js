import React from 'react';
import {news_data} from "../../utils/consts";
import NewsList from "../../components/NewsList";
import "../../styles/feed.css";

import { Formik, Form, Field } from 'formik';

export default class Feed extends React.Component{
	constructor(props){
		super(props);
		this.state={
			noticias:news_data,
			search_results:[],
			last_search:'',
		}
		this.handleNewPost = this.handleNewPost.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}

	handleClearSearch(values) {
        this.setState((currentState) => {
        	return {
	        	search_results: []
	        }
        })
    }

	handleNewPost(values) {
		if(!values.post){
			return;
		}
        this.setState((currentState) => {
        	var newPost={title:"My post from "+Date().toLocaleString(), desc: values.post, src:""};
	        return {
	        	noticias: [newPost].concat(currentState.noticias)
	        }
        })
    }

    handleSearch(values){
    	var keyword;
    	if(!values){ //chamado pelo refresh button
    		if(!this.state.last_search) //vai buscar a ultima pesquisa
    			return;
    		else
    			keyword=this.state.last_search.toLowerCase();
    	}
    	else{ //chamada pelo search button (form)
    		if(!values.search)
    			return;
    		else
		    	keyword=values.search.toLowerCase();
    	}
    		

    	this.setState((currentState) => {
		    return {
		        search_results: currentState.noticias.filter((noticia) => noticia.title.toLowerCase().includes(keyword)),
		        last_search:keyword,
		    }
        })
    }

	render() {
        return (
        	<div id="Feed">
		        <div id="Search">
		        	<Formik
          				initialValues={{ search: '', }}
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
          				initialValues={{ post: '', }}
          				onSubmit={values => this.handleNewPost(values)}
					>
						<Form>
				            <Field type="text" name="post" placeholder="Write new post..." />
				          	<button type="submit">Publish</button>
				        </Form>
					</Formik>
				</div>
				<div id="SearchResults">
					<NewsList noticias={this.state.search_results} nome="Search results" keyword={this.state.last_search} onClearResults={this.handleClearSearch} onSearch={this.handleSearch}/>
				</div>
		        <div id="NewsFeed">
		        	<NewsList noticias={this.state.noticias}  nome="News Feed"/>
		        </div>
	        </div>
        )
    }
}


