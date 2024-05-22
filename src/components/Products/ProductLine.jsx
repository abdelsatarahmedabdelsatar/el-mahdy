import React from "react";
import { Link } from "react-router-dom";

const ProductLine = ({ title, route }) => {
  return (
    <div
      className="py-4  gx-0  justify-content-center gap-3 px-4 me-2 row"
      style={{ fontSize: "12.5px"}}
    >
      <div className="bg-warning rounded-3 shadow-sm  col-1 d-flex justify-content-center align-items-center text-center">
        {title}
      </div>
      <div className="col-md-9 col-8">
        <hr />
      </div>
      <div className="col-md-1 col-2 d-flex align-items-center text-center me-2">
        <Link
          to={route}
          className="py-1 px-3 border border-1 border-dark text-decoration-none text-dark rounded-4"
        >
          عرض الكل
        </Link>
      </div>
    </div>
  );
};

export default ProductLine;
