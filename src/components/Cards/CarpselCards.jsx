import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleAdd, handleLoginNavigate } from "../../helpers/api";
import { useDispatch } from "react-redux";
import { Carousel } from "primereact/carousel";
// import AuthDialog from "../Dialogs/AuthDialog";
import DialogModel from "../Dialogs";

const CaroselCards = ({ data }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const responsiveOptions = [
    {
      breakpoint: "1600px",
      numVisible: 5,
      numScroll: 5,
    },
    {
      breakpoint: "1200px",
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "500px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (item) => {
    return (
      <div dir="rtl" id={item._id} key={item._id} className="m-3">
        <div className="p-1 card h-100 rounded-3 m-auto product-card d-flex position-relative">
          {" "}
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
          <Link to={"/product/" + item._id}>
            <img
              className="card-img-top rounded-3 shadow-sm bg-white"
              src={"./product_img.jpg"}
              height={160}
              alt="Card"
            />
          </Link>
          <div className="card-body pt-2 pe-2 pb-0">
            <Link
              className="text-dark text-decoration-none"
              to={"/product/" + item._id}
            >
              <p className="card-title text-secondary fw-bold mb-0">
                {item.ArTitle}
              </p>
            </Link>
            <p
              className="card-text"
              style={{ color: "#DDD", fontSize: "12px" }}
            >
              {item.ArDescription.substring(0, 11)}...
            </p>
          </div>
          <div className="me-2 mb-1" style={{ fontSize: "10px" }}>
            <p className="list-group-item text-decoration-line-through text-secondary ">
              {item?.price} ر.س
            </p>
            <p className="list-group-item text-danger  fw-bold">
              {item?.priceAfterDiscount} ر.س
            </p>
          </div>
          {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                          <li className="list-group-item">Vestibulum at eros</li> */}
          <button
            className="cart-button d-flex justify-content-center align-items-center"
            onClick={(event) =>{
              // event.target.disabled = true;
              handleAdd(item._id,null, dispatch,setShowModal,event)}}
          >
            {/* <i className="fa-solid fa-bag-shopping"></i> */}
            <img src="./../add.png" width={22} alt="add" srcSet="" />
          </button>
        </div>
      </div>
    );
  };

 
  return (
    <>
      {data.length > 4 ? (
        <Carousel
          indicatorsContentClassName="d-none"
          className="d-flex justify-content-center"
          showarrows="true"
          infiniteloop="true"
          showthumbs="false"
          showstatus="false"
          autoPlay={true}
          interval={5000}
          swipeable="true"
          dynamicheight="true"
          value={data}
          numVisible={5}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          dir="ltr"
        />
      ) : (
        <div className="row justify-content-center">
          {data.map((item) => {
            return (
              <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 col-xs-8 col-12">
                <div dir="rtl" id={item._id} key={item._id} className="m-3">
        <div className="p-1 card h-100 rounded-3 m-auto product-card d-flex position-relative">
          {" "}
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
          <Link to={"/product/" + item._id}>
            <img
              className="card-img-top rounded-3 shadow-sm bg-white"
              src={"./product_img.jpg"}
              height={160}
              alt="Card"
            />
          </Link>
          <div className="card-body pt-2 pe-2 pb-0">
            <Link
              className="text-dark text-decoration-none"
              to={"/product/" + item._id}
            >
              <p className="card-title text-secondary fw-bold mb-0">
                {item.ArTitle}
              </p>
            </Link>
            <p
              className="card-text"
              style={{ color: "#DDD", fontSize: "12px" }}
            >
              {item.ArDescription.substring(0, 11)}...
            </p>
          </div>
          <div className="me-2 mb-1" style={{ fontSize: "10px" }}>
            <p className="list-group-item text-decoration-line-through text-secondary ">
              {item?.price} ر.س
            </p>
            <p className="list-group-item text-danger  fw-bold">
              {item?.priceAfterDiscount} ر.س
            </p>
          </div>
          {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                          <li className="list-group-item">Vestibulum at eros</li> */}
          <button
            className="cart-button d-flex justify-content-center align-items-center"
            onClick={(event) =>{
              // event.target.disabled = true;
              handleAdd(item._id,null, dispatch,setShowModal,event)}}
          >
            {/* <i className="fa-solid fa-bag-shopping"></i> */}
            <img src="./../add.png" width={22} alt="add" srcSet="" />
          </button>
        </div>
      </div>
              </div>
            );
          })}
        </div>
      )}

      {/* <AuthDialog visible={showModal} onHide={() => setShowModal(false)} /> */}
      <DialogModel
        visible={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={()=>handleLoginNavigate(navigate)}
        title="عليك تسجيل الدخول أولاًً "
      />
    </>
  );
};

export default CaroselCards;
