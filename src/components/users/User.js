import React, { Component } from 'react';
import { Spinner } from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Repos from '../repos/Repos';

export class User extends Component {
  componentDidMount() {
    // activating "getUser" at App.js using the user login, grabbed from the path params:
    // this.props.getUser(this.props.match.params.login);
    //
    // same as getUser, but - getting user repos:
    // this.props.getUserRepos(this.props.match.params.login)
    //
    // Solution is wrapping with a function component:
    // https://stackoverflow.com/questions/62365009/how-to-get-parameter-value-from-react-router-dom-v6-in-class
    // https://github.com/remix-run/react-router/issues/7256
    // decided to take on commenting before refactoring
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    userRepos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      company,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    const { loading, userRepos } = this.props;

    if (loading) return <Spinner />;
    return (
      this.props.user && (
        <>
          <Link to="/" className="btn btn-light">
            Back to search
          </Link>
          Hireable{' '}
          {hireable ? (
            <FontAwesomeIcon icon={faCheck} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
          )}
          <div className="card grid-2 all-center">
            <img
              src={avatar_url}
              className="round-img"
              alt=""
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github profile
            </a>
            <ul>
              <li>
                {login && (
                  <>
                    <strong>Username: </strong>
                    {login}
                  </>
                )}
              </li>
              <li>
                {company && (
                  <>
                    <strong>Company: </strong>
                    {company}
                  </>
                )}
              </li>
              <li>
                {blog && (
                  <>
                    <strong>Website: </strong>
                    {blog}
                  </>
                )}
              </li>
            </ul>
          </div>
          <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-light">
              Public Repos: {public_repos}
            </div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
          </div>
          <Repos repos={userRepos} />
        </>
      )
    );
  }
}

export default User;
