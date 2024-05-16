import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct, handleLoginNavigate } from '../../helpers/api';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DialogModel from './../Dialog/index';

const Cards = ({data}) => {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleAdd = (product,dispatch) => {

    if(localStorage.getItem("access-token")){
       addProduct(product,dispatch)
    }else{
      setShowModal(true)
    }

   
  }

    const dispatch = useDispatch()
    return (
        <div className="row justify-content-start">
        {data.map((product) => {
          return (
            <div
              id={product._id}
              key={product._id}
              className="col-lg-3 col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="p-1 card h-100 rounded-4 product-card border-1 border-dark position-relative">
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
                   <i class="fa-regular fa-heart text-secondary"></i>
                  </div>
                <Link to={"/product/" + product._id}>
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
                    to={"/product/" + product._id}
                  >
             <h5 style={{fontFamily:"elmahdy-bold-font"}} className="card-title text-secondary">{product.ArTitle}</h5>
                  </Link>
                  <p className="card-text text-secondary">
                    {product.ArDescription}
                  </p>
                </div>
                <div className="me-3 mb-3">
                   <p className="list-group-item  text-decoration-line-through lead fw-bold text-muted fs-6">
                  {+product?.price} ر.س
                </p>
                <p className="list-group-item  lead text-danger fs-6 fw-bold">
                  {product?.priceAfterDiscount} ر.س
                </p>
                </div>
               
                {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li> */}
                <button
                  className="cart-button"
                  onClick={() => handleAdd(product,dispatch)}
                >
                  {/* <i className="fa-solid fa-bag-shopping"></i> */}
                  <img src="./../add.png" width={27} alt="add" srcSet="" />
                </button>
              </div>
            </div>
          );
        })}
              <DialogModel title={"عليك تسجيل الدخول أولاََ"} visible={showModal} onHide={() => setShowModal(false)} onConfirm={()=>handleLoginNavigate(navigate)} />

      </div>
    );
}

export default Cards;
