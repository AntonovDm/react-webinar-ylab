import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

import "./style.css";

function Menu({ children }) {
  const cn = bem("Menu");

  return (
    <div className={cn("title")}>
      <Link to={`/`} className={cn("link")}>
        {children}
      </Link>
    </div>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
};

export default Menu;
