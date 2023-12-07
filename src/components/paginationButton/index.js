import PropTypes from "prop-types";

import "./style.css";

function PaginationButton({ onClick, isActive, children }) {
  const buttonStyle = isActive
    ? "pagination-button" + " " + "active"
    : "pagination-button";

  return (
    <button className={buttonStyle} onClick={onClick}>
      <p className="pagination-label">{children}</p>
    </button>
  );
}

PaginationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

PaginationButton.defaultProps = {
  onClick: () => {},
  isActive: false,
};

export default PaginationButton;
