import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SET_LOADING,
  SEARCH_USERES,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';
import urls from './github-urls';
const {
  clientId,
  clientSecret,
  usersSearchBaseUrl,
  usersBaseUrl,
  queryOptions,
} = urls;

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `${usersSearchBaseUrl}?q=${text}&${clientId}&${clientSecret}`
    );
    dispatch({ type: SEARCH_USERES, payload: res.data.items });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `${usersBaseUrl}/${username}?${clientId}&${clientSecret}`
    );
    dispatch({ type: GET_USER, payload: res.data });
  };

  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `${usersBaseUrl}/${username}/repos?${queryOptions}&${clientId}&${clientSecret}`
    );
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  return (
    <GithubContext.Provider
      value={{
        // users: state.users
        // user: state.user
        // repos: state.repos
        // loading: state.loading
        ...state,
        searchUsers,
        clearUsers,
        getUserRepos,
        getUser,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
