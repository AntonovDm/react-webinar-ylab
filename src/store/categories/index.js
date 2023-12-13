import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  /**
   * Загрузка категорий товаров
   */
  async getCategories() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.initState(),
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
      );
      const json = await response.json();

      const result = json.result.items;

      const listOfCategories = categoriesArray(result);

      const categories = [{ value: "", title: "Все" }, ...listOfCategories];

      // Категории загружены успешно
      this.setState(
        {
          ...this.getState(),
          categories,
          waiting: false,
        },
        "Загружен список категорий из АПИ"
      );
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.initState(),
        waiting: false,
      });
    }
  }
}

export default CategoriesState;

function categoriesArray(items, parent = null, depth = 0) {
  let result = [];
  for (const item of items) {
    if (
      (parent && item.parent && item.parent._id === parent._id) ||
      (!parent && !item.parent)
    ) {
      const prefix = depth > 0 ? "- ".repeat(depth) : "";
      result.push({ value: item._id, title: `${prefix}${item.title}` });

      const children = categoriesArray(items, item, depth + 1);
      result.push(...children);
    }
  }
  return result;
}
