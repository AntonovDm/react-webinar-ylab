import React from "react";
import PropTypes from "prop-types";
import { formattedThousandthSpace } from "../../utils";

import Button from "../button";

import "./style.css";

function Item({ item, isCartOpen, onAdd, onDelete }) {
  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      onDelete(item.code);
    },
    onAdd: (e) => {
      e.stopPropagation();
      onAdd(item);
    },
  };

  const classNamePrice = !isCartOpen ? "Item-price" : "Item-price--cart";
  const buttonTitle = !isCartOpen ? "Добавить" : "Удалить";

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className={classNamePrice}>{`${formattedThousandthSpace(
        item.price
      )} ₽`}</div>
      {isCartOpen && <div className="Item-count">{`${item.count} шт`}</div>}
      <div className="Item-actions">
        <Button
          onClick={isCartOpen ? callbacks.onDelete : callbacks.onAdd}
          title={buttonTitle}
        />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  isCartOpen: PropTypes.bool,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
  onDelete: () => {},
};

export default React.memo(Item);
