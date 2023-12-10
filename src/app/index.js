import { Navigate, Route, Routes } from "react-router-dom";

import Article from "./article";
import Main from "./main";
import Error from "../components/error";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/article/:articleId"
        element={<Article />}
        errorElement={<Error />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
