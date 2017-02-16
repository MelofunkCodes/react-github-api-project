import React from 'react';
import { Link } from 'react-router';


class GithubUser extends React.Component{
	render(){
		return(
			<div className="gh-user">
				<Link to={`/user/${this.props.login}`}>
					<img src={this.props.avatar_url} alt={`avatar of ${this.props.login}`}/>
					<p>{this.props.login}</p>
				</Link>
			</div>
		);

	}

}


export default GithubUser;