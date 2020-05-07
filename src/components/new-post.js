/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

import { createPost, clearError } from '../actions';

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      notFilledMessage: '',
    };
  }

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  changeTags = (event) => {
    this.setState({ tags: event.target.value });
  }

  changeContent = (event) => {
    this.setState({ content: event.target.value });
  }

  changeCoverUrl = (event) => {
    this.setState({ coverUrl: event.target.value });
  }

  onButtonClick = () => {
    if (this.state.title === '' || this.state.tags === '' || this.state.content === '' || this.state.coverUrl === '') {
      this.setState({ notFilledMessage: 'Oops! Looks like not all the fields are filled.' });
    } else {
      const post = this.state;
      this.props.createPost(post, this.props.history);
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div>
          <div className="error-message">Oops! The following API error occured: </div>
          <div className="error-text">{this.props.errorMessage}</div>
          <button className="error-button" onClick={this.props.clearError}>Return to New Post Page</button>
        </div>
      );
    } else {
      return (
        <div className="new-post">
          <div id="not-filled-text">{this.state.notFilledMessage}</div>
          <div className="input-title">Title</div>
          <input className="short-input" defaultValue={this.state.title} onBlur={this.changeTitle} />
          <div className="input-title">Tags</div>
          <input className="short-input" defaultValue={this.state.tags} onBlur={this.changeTags} />
          <div className="input-title">Content</div>
          <textarea className="tall-input" defaultValue={this.state.content} onBlur={this.changeContent} />
          <div className="input-title">Cover Photo URL</div>
          <input className="short-input" defaultValue={this.state.coverUrl} onBlur={this.changeCoverUrl} />
          <button className="add-button" onClick={this.onButtonClick}>Add Post</button>
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

export default connect(mapStateToProps, { createPost, clearError })(NewPost);
