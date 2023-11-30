import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem(item) {
    const existingProduct = this.state.cart.find(
      (listItem) => listItem.code === item.code
    );

    if (existingProduct) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((cartItem) => {
          if (cartItem.code !== item.code) return cartItem;
          return {
            ...cartItem,
            count: cartItem.count + 1,
          };
        }),
      });
    } else {
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          {
            ...this.state.list.find((listItem) => listItem.code === item.code),
            count: 1,
          },
        ],
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter((item) => item.code !== code),
    });
  }

  getTotalPrice() {
    return this.state.cart.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
  }
}

export default Store;
