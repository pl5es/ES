import React from 'react';

const NewsFeed = (props) => (
	<div>
		<p>{props.noticias.length>0 ? props.nome : ""}</p>
		<ul>
	        {props.noticias.map((news) => (
	            <li id="news" key={news.title}>
		            <a href={news.src} id="header">{news.title}</a>
		            <p>{news.desc}</p>
	            </li>
	        ))}
	    </ul>
    </div>
)

export default NewsFeed;