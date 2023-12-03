import { formattedThousandthSpace } from "../../utils";
import PropTypes from "prop-types";

import React from "react";
import List from "../list";
import Head from "../head";

import "./style.css";

function Cart({ cart, totalPrice, modal, onModalCart, onDeleteItem }) {
  return (
    <>
      <Head title="Корзина" onModalCart={onModalCart} />
      <div className="Cart-list">
        {cart.length === 0 ? (
          <div className="Cart-list--null">
            Корзина пуста, пожалуйста, добавьте что-нибудь.
          </div>
        ) : (
          <>
            <List list={cart} modal={modal} onDeleteItem={onDeleteItem} />
            <div className="Cart-list--total">
              <p>Итого</p>
              <p>{`${formattedThousandthSpace(totalPrice)} ₽`}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.array,
  totalPrice: PropTypes.number,
  modal: PropTypes.bool,
  onModalCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
  onModalCart: () => {},
  onDeleteItem: () => {},
};

export default Cart;
