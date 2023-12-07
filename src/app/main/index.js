import { memo, useCallback, useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Basket from "../basket";

function Main() {
  const store = useStore();

  const activeModal = useSelector((state) => state.modals.name);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
    skip: state.catalog.skip,
    limit: state.catalog.limit,
  }));

  useEffect(() => {
    store.actions.catalog.loadPage(select.skip);
  }, [select.skip]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Изменение страницы
    onPageChange: useCallback(
      (page) => store.actions.catalog.setCurrentPage(page),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <List list={select.list} renderItem={renders.item} />

      {activeModal === "basket" && <Basket />}

      <Pagination
        totalPages={select.totalPages}
        currentPage={select.currentPage}
        onPageChange={callbacks.onPageChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
