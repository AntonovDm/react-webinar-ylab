import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import { Link, useNavigate } from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useSelector from "../../hooks/use-selector";
import { deleteCookie, getCookie } from "../../utils";
import useStore from "../../hooks/use-store";

import "./style.css";

function UserHead() {
  const store = useStore();

  const navigate = useNavigate();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    name: state.authorization.user.name,
  }));

  const token = getCookie("token");

  const callbacks = {
    handleLogOut: () => {
      store.actions.authorization.logOut();
      deleteCookie("token");
      navigate("/");
    },
  };

  return (
    <div className="UserHead">
      <SideLayout side={"end"} padding={"middle"}>
        {!token ? (
          <button onClick={() => navigate("/login")}>
            {t("authorization.enter")}
          </button>
        ) : (
          <>
            <Link className="UserHead-link" to={"/profile"}>
              {select.name}
            </Link>
            <button onClick={callbacks.handleLogOut}>
              {t("authorization.logout")}
            </button>
          </>
        )}
      </SideLayout>
    </div>
  );
}

export default memo(UserHead);
