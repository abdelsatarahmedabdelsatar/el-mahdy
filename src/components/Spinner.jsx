import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        style={{ fontSize: "5px", width: "18px", height: "18px" }}
        role="status"
      ></div>
    </div>
  );
};

export default Spinner;
