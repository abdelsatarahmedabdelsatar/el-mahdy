import React, { useEffect, useState } from "react";
// import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import {
  // addCart,
  // delAllCart,
  // delCart,
  fetchDataFromApi,
} from "../redux/action";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig/instance";
// import { toast } from "sonner";
// import Spinner from "../components/Spinner";
import { ChooseType, handledelete } from "../helpers/api";
import Skeleton from "react-loading-skeleton";

const Cart = () => {
  // const [valueChanged,setValueChanged] = useState("");
  const [refresh, setRefresh] = useState(true);
  const state = useSelector((state) => state.handleCart.cartItems);
  const state2 = useSelector((state) => state.handleCart);
  const totPrice = useSelector(
    (state) => state.handleCart.totalCartPriceAfterDiscount
  );

  
  // const getOptions = () => {
  //  return  [...state.map(s=> {return {...s.options}})]
  // }

  console.log(state2);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, [refresh, dispatch]);

  const renderOptions = (item) => {
    return item.product?.options.map((o, i) => {
      return <div key={i}>{ChooseType(o,item.options,item._id)}</div>;
    });
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center text-secondary">
            <i
              className="fa-solid fa-bag-shopping p-4 rounded-circle"
              style={{
                fontSize: "4rem",
                backgroundColor: "#EEE",
                color: "#BBB",
                width: "110px",
              }}
            ></i>
            <h6 className="p-3">السلة فارغة</h6>
            <Link to="/" className="btn btn-outline-warning mx-4 rounded-5">
              عودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const Loading = () => {
    return (
      <>
        <div className="container my-4">
          <div className="row text-center">
            <Skeleton className="col-10 my-3" height={200} />
            <Skeleton className="col-10 my-3" height={200} />
          </div>
        </div>
      </>
    );
  };
  // const deleteCart = () => {
  //   setDeleteSpinner(true);
  //   axiosInstance
  //     .delete("api/v1/cart", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access-token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       toast.success("تم حذف السلة");
  //       setDeleteSpinner(false);
  //       dispatch(delAllCart());
  //     })
  //     .catch((err) => {
  //       setDeleteSpinner(false);
  //       console.error("Error for deleting cart : ", err);
  //     });
  // };

  let AddingTimer;

  const addItem = (product) => {

    clearTimeout(AddingTimer);

    AddingTimer = setTimeout(()=>{   axiosInstance
      .put(
        "api/v1/cart/" + product._id,
        {
          quantity: parseInt(product.quantity) + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then(() => {
        // dispatch(addCart(product));
        setRefresh(!refresh);
      });},0)
 
  };
  const removeItem = (product) => {

    clearTimeout(AddingTimer);

    setTimeout(()=>{
         if (product.quantity === 1) {
      handledelete(product._id, setRefresh, refresh);
    } else {
      axiosInstance
        .put(
          "api/v1/cart/" + product._id,
          {
            quantity: parseInt(product.quantity) - 1,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        )
        .then(() => {
          // dispatch(delCart(product));
          setRefresh(!refresh);
        });
    }
    },0)
 
  };

  const ShowCart = () => {
    // let subtotal = 0;
    // let shipping = 30.0;
    // state.map((item) => {
    //   return (subtotal += item.product?.priceAfterDiscount * item.quantity);
    // });

    // state.map((item) => {
    //   return (totalItems += item.quantity);
    // });
    return (
      <>
        {state.length && (
          <section className="h-100 gradient-custom">
            <div className="py-3">
              <div className="row gx-0 d-flex justify-content-center">
                <div className="col-md-8">
                  <div className="card border-0">
                    <div className="card-body bg-light">
                      {state?.map((item,i) => {
                      return ( item.product?._id && 
                          <div key={i}>
                            <div className="row gx-0 d-flex align-items-center mb-4 cart-item">
                              <div className="close-icon">
                                <i
                                  onClick={() =>
                                    handledelete(item._id, setRefresh, refresh)
                                  }
                                  className="fa-solid fa-xmark"
                                ></i>
                              </div>
                              <div className="col-md-6 row">
                                <img
                                  src={"./product_img.jpg"}
                                  alt={item.product?.ArTitle}
                                  width={100}
                                  className="col-4"
                                  height={85}
                                />
                                <div className="col">
                                  <div className="fs-5">
                                    {item.product?.ArTitle}
                                  </div>
                                  <p className="fs-6 m-0 text-warning">
                                    {item.product?.priceAfterDiscount}{" "}
                                    <span className="text-muted">ر.س</span>
                                  </p>
                                  <div className="text-muted fs-6">
                                    الإجمالي{" "}
                                    {item.product?.priceAfterDiscount *
                                      +item.quantity}{" "}
                                    ر.س
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6"></div>
                              <div className="row mt-4 align-items-center mx-0">
                                <div className="col-6">الكمية : </div>
                                <div className="col-6 border rounded-1 border-1">
                                  <div className="d-flex fw-bold  justify-content-between align-items-center r">
                                    <button
                                      className="btn counter rounded-0 border-left border-1 p-0"
                                      onClick={() => {
                                        addItem(item);
                                      }}
                                    >
                                      <i
                                        className="fas fa-plus"
                                        style={{ fontSize: "11px" }}
                                      ></i>
                                    </button>
                                    <p
                                      className="m-auto py-2 "
                                      // id="card-quantity"
                                      // style={{ fontSize: "12px" }}
                                    >
                                      {item.quantity}
                                    </p>
                                    <button
                                      className="btn counter rounded-0 border-right border-1 p-0"
                                      onClick={() => {
                                        removeItem(item);
                                      }}
                                    >
                                      <i
                                        className="fas fa-minus"
                                        style={{ fontSize: "11px" }}
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {renderOptions(item)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gx-0 d-flex justify-content-center mb-5">
                <div className="col-md-8">
                  {/* <button
                    onClick={deleteCart}
                    className="btn btn-dark btn-md btn-block mb-3"
                    disabled={deleteSpinner}
                  >
                    {deleteSpinner ? <Spinner /> : "حذف منتجات السلة"}
                  </button> */}
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <ul className="bg-white p-4 border border-1 rounded-2">
                        {/* <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          المنتجات ({totalItems})
                          <span>${Math.round(subtotal)}</span>
                        </li> */}
                        {/* <li className="list-group-item my-3 d-flex justify-content-between align-items-center px-0">
                          شحن
                          <span>${shipping}</span>
                        </li> */}
                        <li className="d-flex justify-content-between align-items-center border-0 px-0">
                          <div>
                            <div>
                              <img
                                src="./calc.png"
                                className="ms-1"
                                width={21}
                                alt=""
                              />{" "}
                              إجمالي السلة
                            </div>
                          </div>
                          <span>
                            <strong className="text-muted">
                              {totPrice} ر.س
                            </strong>
                          </span>
                        </li>
                      </ul>

                      <Link
                        to="/checkout"
                        className="btn btn-warning btn-md float-left btn-block rounded-0"
                        style={{ width: "16%" }}
                      >
                        إتمام الطلب
                        <i className="fa-solid fa-arrow-left me-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  };

  return (
    <>
        <div className="bg-light">
          {state.length ? <ShowCart />:<EmptyCart /> }
        </div>

        
    </>
  );
};

export default Cart;
