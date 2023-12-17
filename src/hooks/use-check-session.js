import { useEffect } from "react";
import { getCookie } from "../utils";
import useStore from "./use-store";

function useCheckSession() {
  const store = useStore();

  const token = getCookie("token");

  useEffect(() => {
    store.actions.user.userProfile(token);
  }, [token]);

  return token;
}

export default useCheckSession;
