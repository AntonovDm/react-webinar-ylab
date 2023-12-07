import { useCallback, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import useStore from "../../store/use-store";
import getArticle from "../../api/getArticle";

import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import useSelector from "../../store/use-selector";
import AboutArticle from "../aboutArticle";
import Basket from "../../app/basket";

function Article() {
  const store = useStore();
  const order = useLoaderData();

  const activeModal = useSelector((state) => state.modals.name);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.catalog.skip,
  }));

  useEffect(() => {
    store.actions.catalog.loadPage(select.skip);
  }, [select.skip]);

  const {
    _id,
    description,
    category: { title: categoryTitle },
    madeIn: { title: madeInTitle },
    edition,
    price,
  } = order.result;

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
  };

  return (
    <PageLayout>
      <Head title="Название товара" />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <AboutArticle
        description={description}
        categoryTitle={categoryTitle}
        madeInTitle={madeInTitle}
        edition={edition}
        price={price}
      />
      <button
        style={{ marginLeft: "40px" }}
        onClick={() => callbacks.addToBasket(_id)}
      >
        Добавить
      </button>
      {activeModal === "basket" && <Basket />}
    </PageLayout>
  );
}

export async function loader({ params }) {
  const order = await getArticle(params.articleId);

  return order;
}

export default Article;
