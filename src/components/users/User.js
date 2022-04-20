import React, { useContext, useEffect } from 'react';
import { Spinner } from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import GithubContext from '../../context/github/githubContext';
import Repos from '../repos/Repos';

const User = () => {
  const githubContext = useContext(GithubContext);
  const { user, loading, getUser, getUserRepos } = githubContext;
  const params = useParams();
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
  } = user;
  useEffect(() => {
    getUser(params.login);
    getUserRepos(params.login);

    // canceling the use eeffect dependencies warning:
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  return (
    user && (
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
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos />
      </>
    )
  );
};

export default User;
