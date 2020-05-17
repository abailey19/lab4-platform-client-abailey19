// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import PostsReducer from './posts-reducer';
import AuthReducer from './auth-reducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  errorMessage: ErrorReducer,
});

export default rootReducer;
