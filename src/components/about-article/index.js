import PropTypes from "prop-types";
import { numberFormat } from "../../utils";

import "./style.css";

function AboutArticle(props) {
  const callbacks = {
    onAdd: (e) => props.onAdd(props.productById._id),
  };

  return (
    <div className="AboutArticle">
      <div className="AboutArticle-content">
        <div className="AboutArticle-description">
          {props.productById.description}
        </div>
        <div className="AboutArticle-item">
          Страна производитель:{" "}
          <span className="AboutArticle-bold">
            {props.productById.madeInTitle}
          </span>
        </div>
        <div className="AboutArticle-item">
          Категория:{" "}
          <span className="AboutArticle-bold">
            {props.productById.categoryTitle}
          </span>
        </div>
        <div className="AboutArticle-item">
          Год выпуска:{" "}
          <span className="AboutArticle-bold">{props.productById.edition}</span>
        </div>
        <div className="AboutArticle-price">
          Цена:{" "}
          <span className="AboutArticle-boldPrice">
            {numberFormat(props.productById.price)} ₽
          </span>
        </div>
      </div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

AboutArticle.propTypes = {
  productById: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    categoryTitle: PropTypes.string,
    madeInTitle: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default AboutArticle;
