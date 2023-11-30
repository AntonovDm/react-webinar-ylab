import React, { useCallback, useState } from "react";

import PageLayout from "./components/page-layout";
import ModalCart from "./components/ModalCart";
import Controls from "./components/controls";
import Modal from "./components/modal";
import List from "./components/list";
import Head from "./components/head";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const totalPrice = store.getTotalPrice();
  const totalCount = cart.length;

  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),
    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      },
      [store]
    ),

    onModalCart: useCallback(() => {
      setIsCartOpen((prev) => !prev);
    }, []),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <Controls
          totalCount={totalCount}
          totalPrice={totalPrice}
          onModalCart={callbacks.onModalCart}
        />
        <List
          list={list}
          isCartOpen={isCartOpen}
          onAddItem={callbacks.onAddItem}
        />
      </PageLayout>
      {isCartOpen && (
        <Modal>
          <ModalCart
            cart={cart}
            totalPrice={totalPrice}
            isCartOpen={isCartOpen}
            onModalCart={callbacks.onModalCart}
            onDeleteItem={callbacks.onDeleteItem}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
