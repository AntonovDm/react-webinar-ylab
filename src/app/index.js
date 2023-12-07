import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Article, { loader as articleLoader } from "../components/article";

import Main from "./main";
import Error from "../components/error";

/**
 * Приложение
 * @returns {React.ReactElement}
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/article/:articleId",
    element: <Article />,
    loader: articleLoader,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
