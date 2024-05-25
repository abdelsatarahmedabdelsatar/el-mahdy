import React from "react";
import { Link } from "react-router-dom";

const ProductLine = ({ title, route }) => {
  return (
    <div className="prd-line position-relative" style={{marginRight:"-3px"}}>
      <div className="line" style={{position:"absolute",left:"161px",top:"23px"}}>
          <hr />
        </div>
      <div
        className="py-4 gx-0 row justify-content-between  gap-4 mx-3 px-5"
        style={{ fontSize: "12.5px" }}
      >
        <div className=" bg-warning st-width px-2 rounded-3 shadow-sm col-1 d-flex justify-content-center align-items-center text-center">
          {title}
        </div>
        
        <div className="col-1 d-flex align-items-center st-width text-center">
          <Link
            to={route}
            className="py-1 px-2 border border-1 border-dark text-decoration-none text-dark rounded-4"
          >
            عرض الكل
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductLine;
