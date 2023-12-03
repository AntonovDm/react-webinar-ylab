import React from "react";
import PropTypes from "prop-types";
import Item from "../item";

import "./style.css";

function List({ list, modal, onAddItem, onDeleteItem }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            modal={modal}
            onDelete={onDeleteItem}
            onAdd={onAddItem}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  modal: PropTypes.bool,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onAddItem: () => {},
  onDeleteItem: () => {},
};

export default React.memo(List);
