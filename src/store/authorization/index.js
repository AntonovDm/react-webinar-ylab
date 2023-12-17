import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class AuthorizationState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: "",
      user: {
        name: "",
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

  async logIn({ login, password }) {
    this.setState({
      ...this.initState(),
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const result = await response.json();

      if (response.ok) {
        this.setState({
          token: result.result.token,
          user: {
            name: result.result.user.profile.name,
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

  async logOut() {
    if (!this.getState().token) {
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });

      const result = await response.json();

      this.setState({
        ...this.initState(),
        waiting: false,
      });
    } catch (e) {
      this.setState({
        ...this.initState(),
        waiting: false,
      });
    }
  }
}

export default AuthorizationState;
