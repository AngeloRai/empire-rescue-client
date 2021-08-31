import React from "react";
import { Link } from "react-router-dom";

function ListAssociations({ items, title, link, unit, exam }) {
  return (
    <div className="col-8 col-md-5 association-box">
      <h4>{title}</h4>
      {items &&
        items.map((item) => (
          <Link
            to={`/${link}/${item.id}`}
            key={item.id}
            className="link"
          >
            {!exam && <div>{item.name} {unit && <small className="text-secondary">{`(${item.unit})`}</small>}</div>}
            {exam && <div>{item.examName}</div>}
          </Link>
        ))}
    </div>
  );
}

export default ListAssociations;
