/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';

import { fetchPosts, filterPosts, clearError } from '../actions';

import PostDisplay from './post-display';

class Posts extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.filterPosts('');
  }

  renderPosts = () => {
    return this.props.posts.map((post) => {
      // Getting rid of TA's test post - sorry TA
      if (this.props.filter === '' && post.title !== 'hello from a ta') {
        return (
          <PostDisplay key={post.id} id={post.id} title={post.title} tags={post.tags} coverUrl={post.coverUrl} />
        );
      } else if (post.tags.includes(this.props.filter)) {
        return (
          <PostDisplay key={post.id} id={post.id} title={post.title} tags={post.tags} coverUrl={post.coverUrl} />
        );
      } else return null;
    });
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div>
          <div className="error-message">Oops! The following API error occured: </div>
          <div className="error-text">{this.props.errorMessage}</div>
          <button className="error-button" onClick={this.props.clearError}>Return to Posts Page</button>
        </div>
      );
    } else {
      return (
        <div className="posts">
          <div className="posts-header">
            <h2>Posts</h2>
          </div>
          <div className="posts-content">
            {this.renderPosts()}
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.all,
    filter: state.posts.filter,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, { fetchPosts, filterPosts, clearError })(Posts);
