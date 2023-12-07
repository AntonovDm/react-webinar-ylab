import { useNavigate, useRouteError } from "react-router-dom";

import PageLayout from "../page-layout";

import "./style.css";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="Error">
        <h1>Something went wrong 😢</h1>
        <p>{error.data || error.message}</p>

        <button className="button" onClick={() => navigate(-1)}>
          &larr; Go back
        </button>
      </div>
    </PageLayout>
  );
}

export default Error;
