/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';

import { signinUser, clearError } from '../actions';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onButtonClick = () => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({ notFilledMessage: 'Oops! Looks like not all the fields are filled.' });
    } else {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signinUser(user, this.props.history);
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div>
          <div className="error-message">{this.props.errorMessage}</div>
          <button className="error-button" onClick={this.props.clearError}>Return to Sign In Page</button>
        </div>
      );
    } else {
      return (
        <div className="signin">
          <div className="signin-header">Sign In</div>
          <div id="not-filled-text">{this.state.notFilledMessage}</div>
          <div className="input-title">Email</div>
          <input className="short-input" defaultValue={this.state.email} onBlur={this.changeEmail} />
          <div className="input-title">Password</div>
          <input className="short-input" type="password" defaultValue={this.state.password} onBlur={this.changePassword} />
          <button className="add-button" onClick={this.onButtonClick}>Sign In</button>
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

export default connect(mapStateToProps, { signinUser, clearError })(Signup);
