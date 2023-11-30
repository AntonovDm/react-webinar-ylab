import { formattedThousandthSpace } from "../../utils";
import PropTypes from "prop-types";

import React from "react";
import List from "../list";
import Head from "../head";

import "./style.css";

function ModalCart({
  cart,
  totalPrice,
  isCartOpen,
  onModalCart,
  onDeleteItem,
}) {
  return (
    <div className="overlay">
      <div className="ModalCart">
        <Head title="Корзина" onModalCart={onModalCart} />
        <div className="Modal-Cart-list">
          {cart.length === 0 ? (
            <div className="ModalCart-list--null">
              Корзина пуста, пожалуйста, добавьте что-нибудь.
            </div>
          ) : (
            <>
              <List
                list={cart}
                isCartOpen={isCartOpen}
                onDeleteItem={onDeleteItem}
              />
              <div className="ModalCart-list--total">
                <p>Итого</p>
                <p>{`${formattedThousandthSpace(totalPrice)} ₽`}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

ModalCart.propTypes = {
  cart: PropTypes.array,
  totalPrice: PropTypes.number,
  isCartOpen: PropTypes.bool,
  onModalCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

ModalCart.defaultProps = {
  onModalCart: () => {},
  onDeleteItem: () => {},
};

export default ModalCart;
