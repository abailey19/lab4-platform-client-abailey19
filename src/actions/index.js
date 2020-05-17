import axios from 'axios';

// const ROOT_URL = 'http://abailey-blog.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '?key=a_bailey';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FILTER_POSTS: 'FILTER_POSTS',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};


export function fetchPosts() {
  return (dispatch) => {
    // Uncomment following line and comment out rest of function to test error handling:
    // dispatch({ type: ActionTypes.SET_ERROR, errorMessage: 'Example error message' });
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then(() => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log(error.response.data);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.response.data });
    });
  };
}

export function filterPosts(tag) {
  return {
    type: ActionTypes.FILTER_POSTS,
    payload: tag,
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    error,
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      console.log(error.response);
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({ username, email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { username, email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      console.log(error.response);
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    // history.push('/');
  };
}

export function clearError() {
  return { type: ActionTypes.CLEAR_ERROR };
}
