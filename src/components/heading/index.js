import PropTypes from "prop-types";

import "./style.css";

function Heading({ heading, title }) {
  const Heading = heading;
  return <Heading className="Heading">{title}</Heading>;
}

Heading.propTypes = {
  heading: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  title: PropTypes.string,
};

export default Heading;
