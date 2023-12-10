import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      productById: {},
      limit: 10,
      currentPage: 1,
      skip: 0,
    };
  }

  setCurrentPage(page) {
    let currentPage = page;
    let skip = (currentPage - 1) * this.getState().limit;

    this.setState(
      {
        ...this.getState(),
        currentPage,
        skip,
      },
      "Изменение страницы"
    );
  }

  async loadPage(skip) {
    const response = await fetch(
      `/api/v1/articles?limit=${
        this.getState().limit
      }&skip=${skip}&fields=items%28_id%2C%20title%2Cprice%29%2Ccount`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / 10),
      },
      "Загружены товары из АПИ"
    );
  }

  async loadPageById(articleId) {
    const response = await fetch(
      `/api/v1/articles/${articleId}?fields=*,madeIn(title,code),category(title)`
    );

    const json = await response.json();

    const {
      _id,
      title,
      description,
      category: { title: categoryTitle },
      madeIn: { title: madeInTitle },
      edition,
      price,
    } = json.result;

    this.setState(
      {
        ...this.getState(),
        productById: {
          _id,
          title,
          description,
          categoryTitle,
          madeInTitle,
          edition,
          price,
        },
        list: [
          {
            _id,
            title,
            description,
            categoryTitle,
            madeInTitle,
            edition,
            price,
          },
        ],
      },
      "Загружен товар по ID"
    );
  }
}

export default Catalog;
