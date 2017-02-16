import React from 'react';
import Infinite from 'react-infinite';


import GithubUser from './GitHubUser';


class Following extends React.Component {
	constructor(){
		super();
		this.state={
			page: 1,
			loading: false,
			following: [],
			endOfTheLine: false
		};

		this.fetchFollowing = this.fetchFollowing.bind(this);
	}
	// componentDidMount(){
	// 	// this.fetchFollowing();
	// }
	fetchFollowing(){
		if (this.state.endOfTheLine) {
			return;
		}
		var token = '9f610438e9208db100d356319321a3152beeb42f';

		this.setState({
			loading: true
		});

		fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${token}&page=${this.state.page}&per_page=50`)
		.then(response=>response.json())
		.then(function(data){
			this.setState({
				following: this.state.following.concat(data),
				loading: false,
				page: this.state.page +1,
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
		// if(!this.state.following){
		// 	return (
		// 		<div>
		// 			LOADING FOLLOWING...
		// 		</div>
		// 	);
		// }

		return(
			<div className="following-page">
				<h3>{this.props.params.username} is following... </h3>
				<ul>
					<Infinite isInfiniteLoading={this.state.loading} 
								onInfiniteLoad={this.fetchFollowing} 
								useWindowAsScrollContainer 
								elementHeight={74}
								infiniteLoadBeginEdgeOffset={100}
								loadingSpinnerDelegate={this.renderLoader()}>
					{this.state.following.map( 
							(eachFollowing, index) => {
								return <li key={index}><GithubUser login={eachFollowing.login} avatar_url={eachFollowing.avatar_url}/></li>
							}
						)
					}
					</Infinite>
				</ul>
			</div>
		);
	}


}

export default Following;