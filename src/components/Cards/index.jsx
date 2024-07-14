import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProduct, handleAdd, handleLoginNavigate } from "../../helpers/api";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import AuthDialog from "../Dialogs/AuthDialog";
import DialogModel from "../Dialogs";

const Cards = ({ data }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);


  const dispatch = useDispatch();
  return (
    <div className="row justify-content-around">
      {data.map((product) => {
        return (
          <div
            id={product._id}
            key={product._id}
            style={{width:"250px"}}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          >
            <div className="p-1 card h-100 rounded-3  position-relative">
              <div
                id="favIcon"
                //   onClick={(eve) => {
                //     toggleFav(eve);
                //   }}
                className="position-absolute p-1 rounded-circle bg-light text-center"
                style={{
                  top: "10px",
                  left: "5%",
                  fontSize: "15px",
                  zIndex: "100",
                  width: "30px",
                  cursor: "pointer",
                }}
              >
                <i className="fa-regular fa-heart text-secondary"></i>
              </div>
              <Link to={"/product/" + product._id}>
                <img
                  className="card-img-top rounded-3 shadow-sm bg-white"
                  src={"./product_img.jpg"}
                  alt="Card"
                  height={225}
                />
              </Link>
              <div className="card-body pt-2 pe-2 pb-0">
                <Link
                  className="text-dark text-decoration-none"
                  to={"/product/" + product._id}
                >
                  <p className="card-title text-secondary fw-bold">
                    {product.ArTitle}
                  </p>
                </Link>
                <p className="card-text" style={{ color: "#DDD" }}>
                  {product.ArDescription}
                </p>
              </div>
              <div className="me-2 mb-1">
                <p className="list-group-item text-decoration-line-through text-secondary fs-6">
                  {+product?.price} ر.س
                </p>
                <p className="list-group-item text-danger fs-6 fw-bold">
                  {product?.priceAfterDiscount} ر.س
                </p>
              </div>
              {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li> */}
              <button 
                className="cart-button d-flex justify-content-center align-items-center"
                onClick={(event) => {
              event.target.disabled = true;
              handleAdd(product._id,null, dispatch,setShowModal,event)}}
              >
                {/* <i className="fa-solid fa-bag-shopping"></i> */}
                <img src="./../add.png" width={22} alt="add" srcSet="" />
              </button>
            </div>
          </div>
        );
      })}
      {/* <AuthDialog
        visible={showModal}
        onHide={() => setShowModal(false)}
      /> */}
      <DialogModel
        visible={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={()=>handleLoginNavigate(navigate)}
        title="عليك تسجيل الدخول أولاًً "
      />
    </div>
  );
};

export default Cards;
