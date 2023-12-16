import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authorization from "./authorization";
import Profile from "./Profile";
import Auth from "./auth";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={""} element={<Auth />}>
          <Route index element={<Main />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/login"} element={<Authorization />} />
          <Route path={"/articles/:id"} element={<Article />} />
        </Route>
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
