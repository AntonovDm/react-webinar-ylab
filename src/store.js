/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map((item) => ({ ...item, amountSelected: 0 })),
    }
    this.listeners = [] // Слушатели изменений состояния
    this.refNumber = this.state.list.length
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener)

    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener)
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener()
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.refNumber += 1
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.refNumber, title: 'Новая запись', amountSelected: 0 },
      ],
    })
    console.log(this.state)
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    })
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          item.selected = !item.selected
          if (item.selected) {
            item.amountSelected += 1
          }
        } else {
          item.selected = false
        }
        return item
      }),
    })
  }

  formatWord(number) {
    const lastTwoDigits = number % 100
    const lastDigit = number % 10

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return `${number} раз`
    }

    if (lastDigit === 1) {
      return `${number} раз`
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${number} раза`
    } else {
      return `${number} раз`
    }
  }
}

export default Store
