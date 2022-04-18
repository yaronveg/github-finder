import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import { Alert } from './components/layout/Alert';

const baseUrl = `https://api.github.com/`;
const clientId = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
const clientSecret = `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
// const getUsersUrl = `${baseUrl}users?${clientId}&${clientSecret}`;
const searchUsersBaseUrl = `${baseUrl}search/users`;

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  //Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `${searchUsersBaseUrl}?q=${text}&${clientId}&${clientSecret}`
    );
    this.setState({ loading: false });
    this.setState({ users: res.data.items, loading: false });
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
    const { users, loading, alert } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            setAlert={this.setAlert}
            showClear={users.length > 0}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
