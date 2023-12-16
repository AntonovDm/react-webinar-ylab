import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

function Auth() {
  useAuth();

  return <Outlet />;
}

export default Auth;
