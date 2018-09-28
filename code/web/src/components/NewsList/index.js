import React from 'react';

const NewsList = (props) => (
	<div>
		<p>{props.noticias.length>0 ? props.nome==="News Feed" ? props.nome : props.nome + " for: " + props.keyword : ""}</p>
		<ul>
	        {props.noticias.map((news) => (
	            <li id="news" key={news.title}>
		            <a href={news.src} id="header">{news.title}</a>
		            <p>{news.desc}</p>
	            </li>
	        ))}
	    </ul>
	    {//so aparecem se for lista de pelo menos um resultado de pesquisa
	    	props.noticias.length>0 && props.nome==="Search results" && 
	    	<button onClick={() => props.onClearResults()}> Clear Search </button>}
	    {props.noticias.length>0 && props.nome==="Search results" && 
	    	<button onClick={() => props.onSearch()}> Refresh </button>}
    </div>
)

export default NewsList;