import React from 'react';


class Repos extends React.Component {
	constructor(){
		super();
		this.state={};
	}
	componentDidMount(){
		this.fetchData();
	}
	fetchData(){
		fetch(`https://api.github.com/users/${this.props.params.username}/repos`)
		.then(response=>response.json())
		.then(function(data){
			this.setState({
				repos: data
			});
		}.bind(this));
	}
	render(){
		//console.log("username: ", this.props.params.username);
		if(!this.state.repos){
			return (
				<div>
					LOADING REPOSITORIES...
				</div>
			);
		}

		return(
			<div className="repos-page">
				<h3>{this.props.params.username}'s repos </h3>
				<ul>
					<li>{this.state.repos.map( 
							(eachRepo) => {
								return (
									<div className="eachRepo">
										<div>
											<a href={eachRepo.html_url} target="_blank">{eachRepo.full_name}</a>
										</div>
										<div className="star-button">
											{eachRepo.stargazers_count} &#9733;
										</div>
									</div>
								);
							}
						)
					}</li>
				</ul>
			</div>
		);
	}
}

export default Repos;