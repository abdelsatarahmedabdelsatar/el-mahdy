import React from "react";
import { Link } from "react-router-dom";

const ProductLine = ({ title, route }) => {
  return (
    <div
      className="mb-2 py-3 gx-0 m-3 d-flex justify-content-around row"
      style={{ fontSize: "13px" }}
    >
      <div className="bg-warning p-2 rounded-4 shadow-sm col-1 text-center">{title}</div>
      <div  className="col-8">
        <hr />
      </div>
      <div className="col-1 d-flex align-items-center">
        <Link
          to={route}
          className="py-1 px-2 border border-1 border-dark text-decoration-none text-dark rounded-4"
        >
          عرض الكل
        </Link>
      </div>
    </div>
  );
};

export default ProductLine;
