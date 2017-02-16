import React from 'react';


import GithubUser from './GitHubUser';


class Followers extends React.Component {
	constructor(){
		super();
		this.state={};
	}
	componentDidMount(){
		this.fetchFollowers();
	}
	fetchFollowers(){
		fetch(`https://api.github.com/users/${this.props.params.username}/followers`)
		.then(response=>response.json())
		.then(function(data){
			this.setState({
				followers: data
			});
		}.bind(this));
	}
	render(){
		//console.log("username: ", this.props.params.username);
		if(!this.state.followers){
			return (
				<div>
					LOADING FOLLOWERS...
				</div>
			);
		}

		return(
			<div className="followers-page">
				<h3>Followers of {this.props.params.username} </h3>
				<ul>
					<li>{this.state.followers.map( 
							(eachFollower) => {
								return <GithubUser login={eachFollower.login} avatar_url={eachFollower.avatar_url}/>
							}
						)
					}</li>
				</ul>
			</div>
		);
	}
}

export default Followers;