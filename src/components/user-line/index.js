import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

function UserLine({ token, name, logIn, logOut, onOut }) {
  const navigate = useNavigate();

  return (
    <div className="UserLine">
      {!token ? (
        <button onClick={() => navigate("/login")}>{logIn}</button>
      ) : (
        <>
          <Link className="UserLine-link" to={"/profile"}>
            {name}
          </Link>
          <button onClick={onOut}>{logOut}</button>
        </>
      )}
    </div>
  );
}

UserLine.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logIn: PropTypes.string.isRequired,
  logOut: PropTypes.string.isRequired,
  onOut: PropTypes.func,
};

UserLine.defaultProps = {
  onOut: () => {},
};

export default UserLine;
