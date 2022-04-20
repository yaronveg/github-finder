import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showClear, clearUsers, searchUsers, showAlert }) => {
  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      showAlert('Please enter some search text', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
};

export default Search;
