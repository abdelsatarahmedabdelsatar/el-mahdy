import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addProduct, handleLoginNavigate } from "../../helpers/api";
import { useDispatch } from "react-redux";
import { Carousel } from "primereact/carousel";
// import AuthDialog from "../Dialogs/AuthDialog";
import DialogModel from "../Dialogs";

const CaroselCards = ({ data }) => {
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
        <div className="p-1 card h-100 rounded-3 product-card  position-relative">
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
            onClick={() => handleAdd(item, dispatch)}
          >
            {/* <i className="fa-solid fa-bag-shopping"></i> */}
            <img src="./../add.png" width={22} alt="add" srcSet="" />
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
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
          swipeable={true}
          dynamicHeight={true}
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
                  <div className="p-1 card h-100 rounded-3   product-card position-relative">
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
                        height={225}
                      />
                    </Link>
                    <div className="card-body pt-2 pe-2 pb-0">
                      <Link
                        className="text-dark text-decoration-none"
                        to={"/product/" + item._id}
                      >
                        <p className="card-title text-secondary fw-bold">
                          {item.ArTitle}
                        </p>
                      </Link>
                      <p className="card-text text-secondary">
                        {item.ArDescription.substring(0, 11)}...
                      </p>
                    </div>
                    <div className="me-2 mb-1">
                      <p className="list-group-item text-decoration-line-through text-secondary fs-6">
                        {item?.price} ر.س
                      </p>
                      <p className="list-group-item text-danger fs-6 fw-bold">
                        {item?.priceAfterDiscount} ر.س
                      </p>
                    </div>
                    {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                                  <li className="list-group-item">Vestibulum at eros</li> */}
                    <button
                      className="cart-button d-flex justify-content-center align-items-center"
                      onClick={() => handleAdd(item, dispatch)}
                    >
                      {/* <i className="fa-solid fa-bag-shopping"></i> */}
                      <img src="./../add.png" width={22} alt="add" srcSet="" />
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}

      {/* <AuthDialog visible={showModal} onHide={() => setShowModal(false)} /> */}
      <DialogModel
        visible={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleLoginNavigate}
        title="عليك تسجيل الدخول أولاًً "
      />
    </>
  );
};

export default CaroselCards;
