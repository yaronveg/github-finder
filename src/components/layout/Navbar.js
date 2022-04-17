import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <FontAwesomeIcon icon={icon} /> {title}
      </h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: faGithub,
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default Navbar;
