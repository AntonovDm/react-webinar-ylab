import { memo, useCallback, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import FormInput from "../../components/form-input";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

import "./style.css";

function LoginForm() {
  const store = useStore();

  const { t } = useTranslate();

  const [login, setLogin] = useState("test");
  const [password, setPassword] = useState("123456");

  const select = useSelector((state) => ({
    authorization: state.authorization,
  }));

  const callbacks = {
    onAuth: useCallback(
      () => store.actions.authorization.logIn({ login, password }),
      [login, password]
    ),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callbacks.onAuth();
  };

  const cn = bem("LoginForm");

  return (
    <form onSubmit={onSubmit} className={cn()}>
      <FormInput
        value={login}
        onChange={setLogin}
        placeholder={""}
        label={t("authorization.login")}
        type={"text"}
      />

      <FormInput
        value={password}
        onChange={setPassword}
        placeholder={""}
        label={t("authorization.password")}
        type={"password"}
      />
      {select.authorization.error && (
        <p className={cn("error")}>{select.authorization.error}</p>
      )}
      <button type="submit">{t("authorization.submit")}</button>
    </form>
  );
}

export default memo(LoginForm);
