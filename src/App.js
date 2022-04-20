import React from 'react';
import './App.css';
import { Alert } from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import { Home } from './components/pages/Home';
import NotFound from './components/pages/NotFound';

const App = () => {
  return (
    <AlertState>
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </GithubState>
    </AlertState>
  );
};

export default App;
