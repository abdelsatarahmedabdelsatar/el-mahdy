import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, fetchDataFromApi } from "../redux/action";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig/instance";
import { toast } from "sonner";

const Cart = () => {
  const [refresh, setRefresh] = useState(true);
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, [refresh]);
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

  const deleteCart = () => {
    axiosInstance
      .delete("api/v1/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        toast.success("تم حذف السلة");
        setRefresh(!refresh);
        state = [ ]
      })
      .catch((err) => {
        console.error("Error for deleting cart : ", err);
      });
  };

  const addItem = (product) => {
    axiosInstance
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
        dispatch(addCart(product));
        setRefresh(!refresh);
      });
  };
  const removeItem = (product) => {
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
        dispatch(delCart(product));
        setRefresh(!refresh);
      });
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.quantity);
    });

    state.map((item) => {
      return (totalItems += item.quantity);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container-fluid py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4 border-0">
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item._id}>
                          <div className="row d-flex align-items-center mb-5">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/1440/1440523.png"
                                  }
                                  // className="w-100"
                                  alt={item.ArTitle}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.product}</strong>
                              </p>
                              {item.color && <p>{item.color}</p>}
                            </div>

                            <div className="col-lg-3 col-md-6">
                              <div
                                className="d-flex mb-3"
                                style={{ maxWidth: "210px" }}
                              >
                                <button
                                  className="btn px-4"
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas text-warning fa-minus"></i>
                                </button>

                                <p className="mx-4 mt-3 ">{item.quantity}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas text-warning fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong className="text-success">
                                  ${item.price}
                                </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <button
                  onClick={deleteCart}
                  className="btn btn-dark btn-md btn-block mb-3"
                >
                  حذف منتجات السلة
                </button>
                <div className="card mb-4 border-0">
                  <h5 className="mb-0 p-4 fs-5">ملخص الطلب</h5>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        المنتجات ({totalItems})
                        <span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        شحن
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>المبلغ الإجمالي</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-warning btn-md btn-block"
                    >
                      إتمام الطلب
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className=" bg-light">
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
