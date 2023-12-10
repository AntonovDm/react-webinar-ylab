import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";

import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useSelector from "../../store/use-selector";
import AboutArticle from "../../components/about-article";
import UnderHead from "../../components/under-head";
import Menu from "../../components/menu";

function Article() {
  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.actions.catalog.loadPageById(params.articleId);
  }, [params.articleId]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    productById: state.catalog.productById,
    amount: state.basket.amount,
    sum: state.basket.sum,
    skip: state.catalog.skip,
  }));

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
      <Head title={select.productById.title} />
      <UnderHead>
        <Menu>Главная</Menu>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </UnderHead>
      <AboutArticle
        productById={select.productById}
        onAdd={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default Article;
