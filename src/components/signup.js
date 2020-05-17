/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';

import { signupUser, clearError } from '../actions';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onButtonClick = () => {
    if (this.state.username === '' || this.state.email === '' || this.state.password === '') {
      this.setState({ notFilledMessage: 'Oops! Looks like not all the fields are filled.' });
    } else {
      const user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signupUser(user, this.props.history);
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div>
          <div className="error-message">{this.props.errorMessage}</div>
          <button className="error-button" onClick={this.props.clearError}>Return to Sign Up Page</button>
        </div>
      );
    } else {
      return (
        <div className="signup">
          <div className="signin-header">Sign Up</div>
          <div id="not-filled-text">{this.state.notFilledMessage}</div>
          <div className="input-title">Username</div>
          <input className="short-input" defaultValue={this.state.username} onBlur={this.changeUsername} />
          <div className="input-title">Email</div>
          <input className="short-input" defaultValue={this.state.email} onBlur={this.changeEmail} />
          <div className="input-title">Password</div>
          <input className="short-input" type="password" defaultValue={this.state.password} onBlur={this.changePassword} />
          <button className="add-button" onClick={this.onButtonClick}>Sign Up</button>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, { signupUser, clearError })(Signup);
