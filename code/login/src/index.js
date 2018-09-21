import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={ inputUsername:'',
					 inputPassword:'',};
		this.updateUsername=this.updateUsername.bind(this);
		this.updatePassword=this.updatePassword.bind(this);
		this.KeyPress=this.KeyPress.bind(this);
		this.SignIn=this.SignIn.bind(this);
	}

	updateUsername(e){
		this.setState({inputUsername:e.target.value});
	}

	updatePassword(e){
		this.setState({inputPassword:e.target.value});
	}

	SignIn(){
		console.log("Dados enviados para a API");
		console.log(this.state.inputUsername);
		console.log(this.state.inputPassword);
	}

	KeyPress(e){
      if(e.keyCode===13){
         this.SignIn();
      }
   }

	render(){
		return(
			<div className="login" onKeyDown={this.KeyPress}>
				<div className="inputUsername">
					<input type='text' placeholder='Enter username' value={this.state.inputUsername} onChange={this.updateUsername}/>
				</div>
				<div className="inputPassword">
					<input type='password' placeholder='Enter password' value={this.state.inputPassword} onChange={this.updatePassword}/>
				</div>
				<div className="SignInButton">	
					<button onClick={this.SignIn}>Sign In</button>
				</div>
				<div className="RegisterLink">
					<a href="https://www.google.com"> Register </a>
				</div>
			</div>
		);
	}
}


ReactDOM.render(<Login />, document.getElementById('root'));