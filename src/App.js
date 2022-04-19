import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import { Alert } from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/pages/About';

const baseUrl = `https://api.github.com/`;
const clientId = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
const clientSecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
const usersBaseUrl = `${baseUrl}search/users`;
const queryOptions = `pre_page=5&sort=created:asc`;

class App extends Component {
  state = {
    users: [],
    user: {},
    userRepos: [],
    loading: false,
    alert: null,
  };

  //Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `${usersBaseUrl}?q=${text}&${clientId}&${clientSecret}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  //Get a single Github user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `${usersBaseUrl}/${username}?${clientId}&${clientSecret}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `${usersBaseUrl}/${username}repos?${queryOptions}&${clientId}&${clientSecret}`
    );
    this.setState({ userRepos: res.data, loading: false });
  };

  //Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set alert state
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, userRepos, loading, alert } = this.state;

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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
  }
}

export default App;
