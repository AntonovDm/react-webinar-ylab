import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function UnderHead({ children }) {
  const cn = bem("UnderHead");

  return <div className={cn()}>{children}</div>;
}

UnderHead.propTypes = {
  children: PropTypes.node,
};

export default UnderHead;
