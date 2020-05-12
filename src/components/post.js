/* eslint-disable react/button-has-type */
/* eslint-disable react/no-danger */
import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

import {
  fetchPost, deletePost, updatePost, clearError,
} from '../actions/index';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isCommenting: false,
      title: props.post.title,
      tags: props.post.tags,
      content: props.post.content,
      coverUrl: props.post.coverUrl,
      newComment: '',
      notFilledMessage: '',
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  changeTags = (event) => {
    this.setState({ tags: event.target.value.split(/[ ,]+/) });
  }

  changeContent = (event) => {
    this.setState({ content: event.target.value });
  }

  changeCoverUrl = (event) => {
    this.setState({ coverUrl: event.target.value });
  }

  changeComment = (event) => {
    this.setState({ newComment: event.target.value });
  }

  clearComments = () => {
    this.props.updatePost(this.props.match.params.postID, {
      comments: null,
    });
  }

  submit = () => {
    if (this.state.isEditing) {
      if (this.state.title === '' || this.state.tags === '' || this.state.content === '' || this.state.coverUrl === '') {
        this.setState({ notFilledMessage: 'Oops! Looks like not all the fields are filled.' });
      } else {
        this.setState({ notFilledMessage: '' });
        this.props.updatePost(this.props.match.params.postID, {
          title: this.state.title,
          tags: this.state.tags,
          content: this.state.content,
          coverUrl: this.state.coverUrl,
        });
        this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
      }
    } else {
      this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
    }
  }

  comment = () => {
    if (this.state.isCommenting && this.state.newComment !== '') {
      if (this.props.post.comments) {
        this.props.updatePost(this.props.match.params.postID, {
          comments: [...this.props.post.comments, this.state.newComment],
        });
        this.setState({ newComment: '' });
      } else {
        this.props.updatePost(this.props.match.params.postID, {
          comments: [this.state.newComment],
        });
        this.setState({ newComment: '' });
      }
    }
    this.setState((prevState) => ({ isCommenting: !prevState.isCommenting }));
  }

  delete = () => {
    this.props.deletePost(this.props.post.id, this.props.history);
  }

  renderTags = () => {
    let tagArray;
    if (this.props.post.tags) {
      tagArray = this.props.post.tags;
    } else {
      tagArray = [];
    }
    return tagArray.map((tag, i) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>#{tag} &nbsp;</div>
      );
    });
  }

  renderComments = () => {
    if (this.props.post.comments) {
      return this.props.post.comments.map((comment, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="comment">{comment}</div>
        );
      });
    } else {
      return null;
    }
  }

  renderBody = () => {
    if (this.state.isEditing && this.props.post.title) {
      return (
        <div className="post-edit">
          <div id="not-filled-text">{this.state.notFilledMessage}</div>
          <div className="input-title">Title</div>
          <input className="short-input" defaultValue={this.props.post.title} onBlur={this.changeTitle} />
          <div className="input-title">Tags</div>
          <input className="short-input" defaultValue={this.props.post.tags} onBlur={this.changeTags} />
          <div className="input-title">Content</div>
          <textarea className="tall-input" defaultValue={this.props.post.content} onBlur={this.changeContent} />
          <div className="input-title">Cover Photo URL</div>
          <input className="short-input" defaultValue={this.props.post.coverUrl} onBlur={this.changeCoverUrl} />
        </div>
      );
    } else {
      return (
        <div className="post-fixed">
          <div className="post-title" dangerouslySetInnerHTML={{ __html: marked(this.props.post.title || '') }} />
          <div className="post-body">
            <div className="cover-image" dangerouslySetInnerHTML={{ __html: marked(`![](${this.props.post.coverUrl})` || '') }} />
            <div className="post-content" dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }} />
          </div>
          <div className="tags-row">
            {this.renderTags()}
          </div>
          <div className="comment-header">Comments</div>
          <div className="comments">
            {this.renderComments()}
            {this.state.isCommenting
              && (
                <input className="short-input" value={this.state.newComment} onChange={this.changeComment} />
              )}
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <div>
          <div className="error-message">Oops! The following API error occured: </div>
          <div className="error-text">{this.props.errorMessage}</div>
          <button className="error-button" onClick={this.props.clearError}>Return to Post Page</button>
        </div>
      );
    } else if (this.props.post.message) {
      return (
        <div>
          <div className="error-message">Oops! The post you are looking for does not exist. </div>
          <button className="footer-button" onClick={() => this.props.history.push('/')}>Return to Home Page</button>
        </div>
      );
    } else {
      return (
        <div className="post">
          {this.renderBody()}
          <footer>
            <div className="footer-section">
              <button className="footer-button"
                onClick={this.comment}
              >{this.state.isCommenting ? 'Finish' : 'Comment'}
              </button>
              <button className="footer-button" onClick={this.clearComments}>Clear Comments</button>
            </div>
            <div className="footer-section">
              <button className="footer-button"
                onClick={this.submit}
              >{this.state.isEditing ? 'Finish' : 'Edit Post'}
              </button>
              <button className="footer-button" onClick={this.delete}>Delete Post</button>
            </div>
          </footer>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.current,
    errorMessage: state.errorMessage,
  };
}

export default connect(mapStateToProps, {
  fetchPost, deletePost, updatePost, clearError,
})(Post);
