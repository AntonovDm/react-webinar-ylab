import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../utils";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import UserLine from "../../components/user-line";
import useCheckSession from "../../hooks/use-check-session";

function UserHead() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const token = useCheckSession();

  const select = useSelector((state) => ({
    name: state.authorization.user.name,
  }));

  const callbacks = {
    handleLogOut: () => {
      store.actions.authorization.logOut();
      deleteCookie("token");
      navigate("/");
    },
  };

  return (
    <SideLayout side={"end"} padding={"middle"}>
      <UserLine
        token={token}
        name={select.name}
        logIn={t("authorization.enter")}
        logOut={t("authorization.logout")}
        onOut={callbacks.handleLogOut}
      />
    </SideLayout>
  );
}

export default memo(UserHead);
