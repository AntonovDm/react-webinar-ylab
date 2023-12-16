import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function FormInput(props) {
  const cn = bem("FormInput");

  return (
    <div className={cn()}>
      <p className={cn("label")}>{props.label}</p>
      <input
        className={cn("input")}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}

FormInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

FormInput.defaultProps = {
  onChange: () => {},
  type: "text",
  label: "",
};

export default memo(FormInput);
