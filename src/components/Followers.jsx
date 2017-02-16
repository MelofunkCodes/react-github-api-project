import React from 'react';
import Infinite from 'react-infinite';


import GithubUser from './GitHubUser';


class Followers extends React.Component {
	constructor(){
		super();
		this.state={
			page: 1,
			loading: false,
			followers: [], 
			endOfTheLine: false
		};

		this.fetchFollowers = this.fetchFollowers.bind(this);
	}

	// //not event needed, as the Infinite tag is calling fetchFollowers upon first rendering (mount) anyway
	// componentDidMount(){
	// 	 this.fetchFollowers(); 
	// }
	fetchFollowers(){
		//if you've reached the end of followers, don't even FETCH/GET a response
		if(this.state.endOfTheLine){
			return;
		}

		var token = '9f610438e9208db100d356319321a3152beeb42f';

		this.setState({
			loading: true
		});

		//note: the endOfTheLine property of setState, when no data or response is retrieved, it will evaluate to true, then upon next call to fetchFollowers, fetch will not be called.
		fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${token}&page=${this.state.page}&per_page=50`)
		.then(response=>response.json())
		.then(function(data){
			this.setState({
				followers: this.state.followers.concat(data),
				loading: false,
				page: this.state.page + 1,
				endOfTheLine: data.length===0
			});
		}.bind(this));
	}

	//return loading at bottom of page, if there are still elements to load, but if not, return nothing
	renderLoader() {
		if(!this.state.endOfTheLine) {
			return <div>LOADING</div>
		}
		return null;
	}

	render(){
		//console.log("username: ", this.props.params.username);
		// if(!this.state.followers){
		// 	return (
		// 		<div>
		// 			LOADING FOLLOWERS...
		// 		</div>
		// 	);
		// }



		return(
			<div className="followers-page">
				<h3>Followers of {this.props.params.username} </h3>
				<ul>
					<Infinite isInfiniteLoading={this.state.loading} 
								onInfiniteLoad={this.fetchFollowers} 
								useWindowAsScrollContainer 
								elementHeight={74}
								infiniteLoadBeginEdgeOffset={100}
								loadingSpinnerDelegate={this.renderLoader()}>
					{this.state.followers.map( 
							(eachFollower, index) => {
								return <li key={index}><GithubUser login={eachFollower.login} avatar_url={eachFollower.avatar_url}/></li>
							}
						)
					}
					</Infinite>
				</ul>
			</div>
		);
	}
}

export default Followers;