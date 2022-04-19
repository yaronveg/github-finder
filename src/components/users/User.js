import React, { Component } from 'react';

export class User extends Component {
  componentDidMount() {
    // this.props.getUser(this.props.match.redirectParam);
    console.log('testing: ', this.props);
    // Solution is wrapping with a function component:
    // https://stackoverflow.com/questions/62365009/how-to-get-parameter-value-from-react-router-dom-v6-in-class
    // https://github.com/remix-run/react-router/issues/7256
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    const { loading } = this.props;

    return this.props.user && <div>{name}</div>;
  }
}

export default User;
