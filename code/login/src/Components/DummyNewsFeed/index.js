import React, { Component } from "react";
import "../../Styles/DummyNewsFeed.css";

function NewsList (props) {
      return (
        <ul>
          {props.noticias.map((news) => (
            <li key={news.title}>
              <a href={news.src} id="header">{news.title}</a>
              <p>{news.desc}</p>
            </li>
          ))}
        </ul>
      )
    }

export default class DummyNewsFeed extends Component{
	constructor(props){
		super(props);
		const news=
		[
			{title:"EvoCOP 2019",
			desc:"The EvoCOP 2019 conference will be held in the city of Leipzig, Germany, together with EuroGP (the 22nd European Conference on Genetic Programming), EvoMUSART (the 8th European conference on evolutionary and biologically inspired music, sound, art and design) and EvoApplications (the 22nd European Conference on the Applications of Evolutionary Computation), in a joint event collectively known as EvoStar (Evo*).",
			src:"https://www.cisuc.uc.pt/home/news/evostar2019"},

			{title:"QUATIC 2018",
			desc:"The International Conference on the Quality of Information and Communications Technology (QUATIC) serves as a forum for disseminating advanced methods, techniques and tools for supporting quality approaches to ICT engineering and management. Practitioners and researchers are encouraged to exchange ideas and approaches on how to adopt a quality culture in ICT process and product improvement and to provide practical studies in varying contexts.",
			src:"https://www.cisuc.uc.pt/home/news/QUATIC2018"}
		];
		
		this.state={
			noticias:news,
		}
	}

	render() {
        return (
          <div id="feed">
            <NewsList noticias={this.state.noticias} />
          </div>
        )
      }
}