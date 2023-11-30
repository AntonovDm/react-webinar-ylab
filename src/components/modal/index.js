import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(<div>{children}</div>, document.body);
}

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
