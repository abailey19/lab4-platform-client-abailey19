/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { filterPosts, signoutUser } from '../actions';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: this.props.filter,
    };
  }

  onInputChange = (event) => {
    this.setState({ filter: event.target.value });
  }

  onButtonClick = () => {
    this.props.filterPosts(this.state.filter);
  }

  signOut = () => {
    console.log(this.props.history);
    this.props.signoutUser(this.props.history);
  }

  renderAuthButtons = () => {
    if (this.props.authenticated) {
      return (
        <div>
          <NavLink className="nav-elem" to="/">
            <button className="auth-button" onClick={this.signOut}>Sign Out</button>
          </NavLink>
        </div>
      );
      // return <button className="new-button" onClick={this.signOut}>Sign Out</button>;
    } else {
      return (
        <div>
          <NavLink className="nav-elem" to="/signin">
            <button className="auth-button">Sign In</button>
          </NavLink>
          <NavLink className="nav-elem" to="/signup">
            <button className="auth-button">Sign Up</button>
          </NavLink>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <ul className="navbar">
          <li>
            <NavLink className="nav-elem" exact to="/">
              <h1>Beautiful Places</h1>
            </NavLink>
          </li>
          <li>
            <input
              className="filter-input"
              value={this.state.filter}
              placeholder="Filter posts"
              onChange={this.onInputChange}
            />
            <button id="search-button" onClick={this.onButtonClick}><SearchIcon id="search-icon" /></button>
            <NavLink className="nav-elem" to="/posts/new">
              <button className="new-button">New Post</button>
            </NavLink>
          </li>
          <li>
            {this.renderAuthButtons()}
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.posts.filter,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { filterPosts, signoutUser })(Nav);
