import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProduct, handleLoginNavigate } from "../../helpers/api";
import { useDispatch } from "react-redux";
import { Carousel } from "primereact/carousel";
import DialogModel from "./../Dialog/index";

const CaroselCards = ({ data }) => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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
        <div className="p-1 card h-100 rounded-4 product-card border-1 border-secondary position-relative">
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
              alt="Card"
              height={150}
            />
          </Link>
          <div className="card-body pb-0">
            <Link
              className="text-dark text-decoration-none"
              to={"/product/" + item._id}
            >
              <h5
                style={{ fontFamily: "elmahdy-bold-font" }}
                className="card-title text-secondary"
              >
                {item.ArTitle}
              </h5>
            </Link>
            <p className="card-text text-secondary">
              {item.ArDescription.substring(0, 11)}...
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
      {data.length > 4 ? (
        <Carousel
          indicatorsContentClassName="d-none"
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
              <>
                <div
                  dir="rtl"
                  id={item._id}
                  key={item._id}
                  className="col-5 col-md-3"
                >
                  <div className="p-1 card h-100 rounded-4 product-card border-1 border-secondary position-relative">
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
                        src={
                          "./product_img.jpg"
                        }
                        alt="Card"
                        height={225}
                      />
                    </Link>
                    <div className="card-body pb-0">
                      <Link
                        className="text-dark text-decoration-none"
                        to={"/product/" + item._id}
                      >
                        <h5
                          style={{ fontFamily: "elmahdy-bold-font" }}
                          className="card-title text-secondary"
                        >
                          {item.ArTitle}
                        </h5>
                      </Link>
                      <p className="card-text text-secondary">
                        {item.ArDescription.substring(0, 11)}...
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
              </>
            );
          })}
        </div>
      )}

      <DialogModel
        title={"عليك تسجيل الدخول أولاََ"}
        visible={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={()=>handleLoginNavigate(navigate)}
      />
    </>
  );
};

export default CaroselCards;
