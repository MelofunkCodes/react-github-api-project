import React from 'react';
import Infinite from 'react-infinite';


class Repos extends React.Component {
	constructor(){
		super();
		this.state={
			page: 1,
			loading: false,
			repos: [],
			endOfTheLine: false
		};

		this.fetchData = this.fetchData.bind(this);
	}
	componentDidMount(){
		this.fetchData();
	}
	fetchData(){
		if(this.state.endOfTheLine){
			return;
		}

		var token = 'c69';

		this.setState({
			loading: true
		});

		fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${token}&page=${this.state.page}&per_page=50`)
		.then(response=>response.json())
		.then(function(data){
			this.setState({
				repos: this.state.repos.concat(data),
				loading: false,
				page: this.state.page+1,
				endOfTheLine: data.length===0
			});
		}.bind(this));
	}

	renderLoader() {
		if(!this.state.endOfTheLine) {
			return <div>LOADING</div>
		}
		return null;
	}

	render(){
		//console.log("username: ", this.props.params.username);
		// if(!this.state.repos){
		// 	return (
		// 		<div>
		// 			LOADING REPOSITORIES...
		// 		</div>
		// 	);
		// }

		return(
			<div className="repos-page">
				<h3>{this.props.params.username}'s repos </h3>
				<ul>
					<Infinite isInfiniteLoading={this.state.loading} 
								onInfiniteLoad={this.fetchData} 
								useWindowAsScrollContainer 
								elementHeight={25}
								infiniteLoadBeginEdgeOffset={100}
								loadingSpinnerDelegate={this.renderLoader()}>
					{this.state.repos.map( 
							(eachRepo, index) => {
								return (
									<li key={index}><div className="eachRepo">
										<div>
											<a href={eachRepo.html_url} target="_blank">{eachRepo.full_name}</a>
										</div>
										<div className="star-button">
											{eachRepo.stargazers_count} &#9733;
										</div>
									</div></li>
								);
							}
						)
					}
					</Infinite>
				</ul>
			</div>
		);
	}

}

export default Repos;