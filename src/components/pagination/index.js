import PropTypes from "prop-types";
import PaginationButton from "../paginationButton";

import "./style.css";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const buffer = currentPage === 1 || currentPage === totalPages ? 2 : 1; // Количество страниц, которые отображаются до и после текущей страницы

  const handleClick = (page) => {
    onPageChange(page);
  };

  const isButtonActive = (page) => page === currentPage;

  const generatePagination = () => {
    const pagination = [];

    if (totalPages <= 1) return pagination;

    if (currentPage !== 1) {
      pagination.push(1);
    }

    if (currentPage - buffer > 2) {
      pagination.push("...");
    }

    for (let i = currentPage - buffer; i < currentPage; i++) {
      if (i > 1) {
        pagination.push(i);
      }
    }

    pagination.push(currentPage);

    for (let i = currentPage + 1; i <= currentPage + buffer; i++) {
      if (i < totalPages) {
        pagination.push(i);
      }
    }

    if (currentPage + buffer < totalPages - 1) {
      pagination.push("...");
    }

    if (currentPage !== totalPages) {
      pagination.push(totalPages);
    }

    return pagination;
  };

  return (
    <div className="pagination">
      {generatePagination().map((item, index) => {
        if (item === "...") {
          return (
            <span className="ellipsis" key={`ellipsis-${index}`}>
              {item}
            </span>
          );
        } else {
          return (
            <PaginationButton
              key={`item-${index}`}
              onClick={() => handleClick(item)}
              isActive={isButtonActive(item)}
            >
              {item}
            </PaginationButton>
          );
        }
      })}
    </div>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  onPageChange: () => {},
  totalPages: 1,
  currentPage: 1,
};

export default Pagination;
