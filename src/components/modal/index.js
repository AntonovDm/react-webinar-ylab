import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import "./style.css";

function Modal({ children }) {
  return createPortal(
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
