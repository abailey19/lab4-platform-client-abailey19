import { ActionTypes } from '../actions';

const ErrorReducer = (state = '', action) => {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return action.errorMessage;
    case ActionTypes.CLEAR_ERROR:
      return '';
    default:
      return state;
  }
};

export default ErrorReducer;
