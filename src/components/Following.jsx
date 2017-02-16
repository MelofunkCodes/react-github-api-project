import React from 'react';


import GithubUser from './GitHubUser';


class Following extends React.Component {
	constructor(){
		super();
		this.state={};
	}
	componentDidMount(){
		this.fetchFollowing();
	}
	fetchFollowing(){
		fetch(`https://api.github.com/users/${this.props.params.username}/following`)
		.then(response=>response.json())
		.then(function(data){
			this.setState({
				following: data
			});
		}.bind(this));
	}
	render(){
		//console.log("username: ", this.props.params.username);
		if(!this.state.following){
			return (
				<div>
					LOADING FOLLOWING...
				</div>
			);
		}

		return(
			<div className="following-page">
				<h3>{this.props.params.username} is following... </h3>
				<ul>
					<li>{this.state.following.map( 
							(eachFollowing) => {
								return <GithubUser login={eachFollowing.login} avatar_url={eachFollowing.avatar_url}/>
							}
						)
					}</li>
				</ul>
			</div>
		);
	}
}

export default Following;