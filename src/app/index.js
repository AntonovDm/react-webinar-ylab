import { Navigate, Route, Routes } from "react-router-dom";

import Article from "./article";
import Main from "./main";
import Error from "../components/error";
import useSelector from "../store/use-selector";
import Basket from "./basket";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/article/:articleId"
          element={<Article />}
          errorElement={<Error />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
