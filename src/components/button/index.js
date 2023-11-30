import React from "react";
import PropTypes from "prop-types";

import "./style.css";

function Button({ title, onClick }) {
  return (
    <>
      <button className="Button" onClick={onClick}>
        <p className="Button-title">{title}</p>
      </button>
    </>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
