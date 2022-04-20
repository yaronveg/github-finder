import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { Alert } from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/pages/About';

const baseUrl = `https://api.github.com`;
const clientId = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
const clientSecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
const usersSearchBaseUrl = `${baseUrl}/search/users`;
const usersBaseUrl = `${baseUrl}/users`;
const queryOptions = `pre_page=5&sort=created:asc`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //Search Github users
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `${usersSearchBaseUrl}?q=${text}&${clientId}&${clientSecret}`
    );
    setLoading(false);
    setUsers(res.data.items);
  };

  //Get a single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `${usersBaseUrl}/${username}?${clientId}&${clientSecret}`
    );
    setLoading(false);
    setUser(res.data);
  };

  // Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `${usersBaseUrl}/${username}/repos?${queryOptions}&${clientId}&${clientSecret}`
    );
    setLoading(false);
    setUserRepos(res.data);
  };

  //Clear users from state
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  };

  // Set alert state
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showAlert={showAlert}
                    showClear={users.length > 0}
                  />
                  <Users loading={loading} users={users} />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/user/:login"
              element={
                <User
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  userRepos={userRepos}
                  loading={loading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
