import axios from 'axios';

const ROOT_URL = 'http://abailey-blog.herokuapp.com/api';
const API_KEY = '?key=a_bailey';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FILTER_POSTS: 'FILTER_POSTS',
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
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then(() => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(() => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function filterPosts(tag) {
  return {
    type: ActionTypes.FILTER_POSTS,
    payload: tag,
  };
}

export function clearError() {
  return { type: ActionTypes.CLEAR_ERROR };
}
