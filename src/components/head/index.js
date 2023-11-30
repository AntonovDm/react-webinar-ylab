import React from "react";
import PropTypes from "prop-types";

import Button from "../button";

import "./style.css";

function Head({ title, onModalCart }) {
  const className = title !== "Корзина" ? "Head" : "Head Head-cart";
  return (
    <div className={className}>
      <h1>{title}</h1>
      {title === "Корзина" && <Button title="Закрыть" onClick={onModalCart} />}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  onModalCart: PropTypes.func,
};

Head.defaultProps = {
  onModalCart: () => {},
};

export default React.memo(Head);
