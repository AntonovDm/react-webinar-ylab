import { useEffect } from "react";
import { getCookie } from "../utils";
import useStore from "./use-store";

function useAuth() {
  const token = getCookie("token");
  const store = useStore();

  useEffect(() => {
    const getUser = async () => {
      await store.actions.authorization.user(token);
      await store.actions.user.userProfile(token);
    };
    if (token) {
      getUser();
    }
  }, []);
}

export default useAuth;
