import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class UserState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: "",
      user: {
        email: "",
        name: "",
        phone: "",
        _id: "",
      },
      error: "",
      waiting: false,
    };
  }

  resetState() {
    this.setState({
      ...this.initState(),
    });
  }

  async userProfile(token) {
    if (token) {
      this.setState({
        ...this.getState(),
        token,
      });
    }

    this.setState({
      ...this.getState(),
      waiting: true,
      error: "",
    });

    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });

      const result = await response.json();

      if (response.ok) {
        this.setState({
          user: {
            email: result.result.email,
            name: result.result.profile.name,
            phone: result.result.profile.phone,
            _id: result.result._id,
          },
          error: "",
          waiting: false,
        });
      } else {
        this.setState({
          ...this.getState(),
          error: result.error.data?.issues[0].message || result.error.message,
          waiting: false,
        });
      }
    } catch (err) {
      this.setState({
        ...this.initState(),
        error: err.message,
        waiting: false,
      });
    }
  }
}

export default UserState;
