import React from "react";
import PropTypes from "prop-types";
import { formattedThousandthSpace, plural } from "../../utils";

import Button from "../button";

import "./style.css";

function Controls({ totalCount, totalPrice, onModalCart }) {
  const allPosition = `${totalCount} ${plural(totalCount, {
    one: "товар",
    few: "товара",
    many: "товаров",
  })}`;

  return (
    <div className="Controls">
      <div className="Controls-cart">
        В корзине:{" "}
        {totalCount === 0 ? (
          <p className="Controls-cart--empty">пусто</p>
        ) : (
          <p className="Controls-cart--total">{`${allPosition} / ${formattedThousandthSpace(
            totalPrice
          )} ₽`}</p>
        )}
      </div>
      <Button title={"Перейти"} onClick={onModalCart} />
    </div>
  );
}

Controls.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
  onModalCart: PropTypes.func,
};

Controls.defaultProps = {
  onModalCart: () => {},
};

export default React.memo(Controls);
