import { memo, useEffect } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import UserHead from "../../containers/user-head";
import UserCard from "../../components/user-card";
import SideLayout from "../../components/side-layout";
import Heading from "../../components/heading";
import { Navigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import { getCookie } from "../../utils";

function Profile() {
  const store = useStore();

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.user.waiting,
    user: state.user,
  }));

  const token = getCookie("token");

  useEffect(() => {
    store.actions.user.userProfile(token);
  }, [token]);

  const { t } = useTranslate();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <PageLayout>
      <UserHead />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout side={"start"} padding={"medium"}>
        <Heading heading={"h3"} title={t("profile")} />
      </SideLayout>
      <Spinner active={select.waiting}>
        <UserCard user={select.user.user} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
