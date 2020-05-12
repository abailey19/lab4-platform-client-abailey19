/* eslint-disable react/no-danger */
import React from 'react';
import { Link } from 'react-router-dom';
import marked from 'marked';

const renderTags = (tags) => {
  const tagArray = tags;
  return tagArray.map((tag, i) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className="tag">#{tag} &nbsp;</div>
    );
  });
};

const PostDisplay = (props) => {
  return (
    <Link className="post-link" to={`posts/${props.id}`}>
      <div className="post-display">
        <div className="display-image" dangerouslySetInnerHTML={{ __html: marked(`![](${props.coverUrl})` || '') }} />
        <div className="display-text">
          <div className="display-title" dangerouslySetInnerHTML={{ __html: marked(props.title || '') }} />
          <div className="display-tags">
            {renderTags(props.tags)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostDisplay;
