import PropTypes from "prop-types";
import { numberFormat } from "../../utils";

import "./style.css";

function AboutArticle({
  description,
  categoryTitle,
  madeInTitle,
  edition,
  price,
}) {
  return (
    <div className="AboutArticle">
      <div className="AboutArticle-content">
        <div className="AboutArticle-description">{description}</div>
        <div className="AboutArticle-item">
          Страна производитель:{" "}
          <span className="AboutArticle-bold">{madeInTitle}</span>
        </div>
        <div className="AboutArticle-item">
          Категория: <span className="AboutArticle-bold">{categoryTitle}</span>
        </div>
        <div className="AboutArticle-item">
          Год выпуска: <span className="AboutArticle-bold">{edition}</span>
        </div>
        <div className="AboutArticle-price">
          Цена:{" "}
          <span className="AboutArticle-boldPrice">
            {numberFormat(price)} ₽
          </span>
        </div>
      </div>
    </div>
  );
}

AboutArticle.propTypes = {
  description: PropTypes.string,
  categoryTitle: PropTypes.string,
  madeInTitle: PropTypes.string,
  edition: PropTypes.number,
  price: PropTypes.number,
};

export default AboutArticle;
