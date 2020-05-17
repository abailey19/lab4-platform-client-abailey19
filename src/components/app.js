import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import PrivateRoute from './private-route';
import NavBar from './navbar';
import Posts from './posts';
import Post from './post';
import NewPost from './new-post';
import Signup from './signup';
import Signin from './signin';

const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar history={props.history} />
        <Switch>
          <Route exact path="/" component={Posts} />
          <PrivateRoute path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signup/" component={Signup} />
          <Route path="/signin/" component={Signin} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
