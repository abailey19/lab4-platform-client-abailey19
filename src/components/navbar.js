/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { filterPosts } from '../actions';

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
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.posts.filter,
  };
}

export default connect(mapStateToProps, { filterPosts })(Nav);
