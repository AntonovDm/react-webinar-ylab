import { memo } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../containers/login-form";
import Heading from "../../components/heading";
import SideLayout from "../../components/side-layout";
import UserHead from "../../containers/user-head";
import useSelector from "../../hooks/use-selector";
import { Navigate } from "react-router-dom";

function Authorization() {
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    token: state.authorization.token,
  }));

  if (select.token) {
    return <Navigate to={"/"} />;
  }

  return (
    <PageLayout>
      <UserHead />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout side={"start"} padding={"medium"}>
        <Heading heading={"h3"} title={t(`authorization.enter`)} />
      </SideLayout>
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Authorization);
