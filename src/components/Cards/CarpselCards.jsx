import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addProduct } from "../../helpers/api";
import { useDispatch } from "react-redux";
import { Carousel } from "primereact/carousel";
import DialogModel from './../Dialog/index';

const CaroselCards = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    window.location.assign("/login");
  };

  const handleAdd = (product, dispatch) => {
    if (localStorage.getItem("access-token")) {
      addProduct(product, dispatch);
    } else {
      setShowModal(true);
    }
  };
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (item) => {
    return (
      <div dir="rtl" id={item._id} key={item._id} className="m-3">
        <div className="card h-100 rounded-4 shadow border-1 border-secondary position-relative">
          {" "}
          <div
            id="favIcon"
            //   onClick={(eve) => {
            //     toggleFav(eve);
            //   }}
            className="position-absolute p-1 rounded-circle bg-light"
            style={{
              top: "10px",
              left: "5%",
              fontSize: "15px",
              zIndex: "100",
              width: "30px",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-heart"></i>
          </div>
          <Link to={"/product/" + item._id}>
            <img
              className="card-img-top rounded-3 shadow-sm"
              src={"https://cdn-icons-png.flaticon.com/512/1440/1440523.png"}
              alt="Card"
              height={220}
            />
          </Link>
          <div className="card-body">
            <Link
              className="text-dark text-decoration-none"
              to={"/product/" + item._id}
            >
              <h5 className="card-title">{item.ArTitle}</h5>
            </Link>
            <p className="card-text text-secondary">
              {item.ArDescription.substring(0, 18)}...
            </p>
          </div>
          <div className="me-3 mb-3">
            <p className="list-group-item  text-decoration-line-through lead text-secondary fs-6">
              {item?.price} ر.س
            </p>
            <p className="list-group-item  lead text-danger fs-6 fw-bold">
              {item?.priceAfterDiscount} ر.س
            </p>
          </div>
          {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                          <li className="list-group-item">Vestibulum at eros</li> */}
          <button
            className="cart-button"
            onClick={() => handleAdd(item, dispatch)}
          >
            {/* <i className="fa-solid fa-bag-shopping"></i> */}
            <img src="./../add.png" width={27} alt="add" srcSet="" />
          </button>
        </div>
      </div>
    );
  };

  const dispatch = useDispatch();
  return (
    <>
      <Carousel
        value={data}
        numVisible={4}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        dir="ltr"
      />
      <DialogModel
        title={"عليك تسجيل الدخول أولاََ"}
        visible={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default CaroselCards;
