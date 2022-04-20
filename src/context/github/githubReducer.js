import {
  SET_LOADING,
  SEARCH_USERES,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SEARCH_USERES:
      return { ...state, users: action.payload, loading: false };
    case CLEAR_USERS:
      return { ...state, users: [] };
    case GET_USER:
      return { ...state, user: action.payload, loading: false };
    case GET_REPOS:
      return { ...state, repos: action.payload, loading: false };
    default:
      return state;
  }
};

export default GithubReducer;
