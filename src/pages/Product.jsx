import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import axiosInstance from "../axiosConfig/instance";
import { addProduct, handleLoginNavigate } from "../helpers/api";
import DialogModel from "../components/Dialog";

const Product = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [productColor, setProductColor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = (product, dispatch) => {
    if (localStorage.getItem("access-token")) {
      addProduct(product, dispatch);
    } else {
      setShowModal(true);
    }
  };

  const handleCartNavigate = () => {
    if (localStorage.getItem("access-token")) {
      navigate("/cart")
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setLoading2(true);

    const getSimilarProducts = (catId) => {
      axiosInstance
        .get(`api/v1/product?limit=1000000&category=${catId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setSimilarProducts(res.data.data.data);
          setLoading2(false);
        })
        .catch((err) => {
          setLoading2(false);

          console.log(err);
        });
    };

    const getProduct = () => {
      axiosInstance
        .get("api/v1/product/" + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setProduct(res.data.data);
          console.log(res.data.data);
          getSimilarProducts(res.data.data.category._id);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };

    getProduct();

    //   const getProduct = async () => {
    //     setLoading(true);
    //     setLoading2(true);
    //     const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    //     const data = await response.json();
    // setProduct(dataJson.find((p) => p.id == id));
    //     setLoading(false);
    //     const response2 = await fetch(
    //       `https://fakestoreapi.com/products/category/${data.category}`
    //     );
    //     const data2 = await response2.json();
    //     setSimilarProducts(data2);
    //     setLoading2(false);
    //   };
    // setSimilarProducts(dataJson.filter((p) => p.category == product.category));
    // setLoading(false);
    // setLoading2(false);
    //   getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-5">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-7">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-1" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-3 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                // src={product?.image}
                src="./product_img.jpg"
                alt={product?.ArTitle}
                width="400px"
                height="400px"
              />
            </div>
            <div className="col-md-6 py-5">
              {/* <h4 className="text-uppercase text-muted">{product.category}</h4> */}
              <h2>{product?.ArTitle}</h2>
              <h4 className="text-muted mb-5">{product?.EnTitle}</h4>
              {/* <p className="lead text-warning">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p> */}
              <span>
                <h4 className="d-inline text-success ps-4">
                  ${product?.priceAfterDiscount}
                </h4>
                <select
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                  className="form-select d-inline w-50"
                  aria-label="Default select example"
                >
                  <option defaultValue={""}>إختار اللون</option>
                  {product?.colors.map((p, i) => {
                    return (
                      <option key={i} value={p}>
                        {p}
                      </option>
                    );
                  })}
                </select>
              </span>

              <h4 className="list-group-item text-decoration-line-through lead text-muted">
                $ {+product?.price}
              </h4>
              <p className="lead">{product?.ArDescription}</p>
              <p className="lead">{product?.EnDescription}</p>
              <button
                className="btn btn-warning mx-1"
                onClick={() => handleAdd(product, dispatch)}
              >
                إضافة الي السلة
              </button>
              <button onClick={handleCartNavigate} className="btn btn-outline-warning">
                الذهاب الي السلة
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
          <Marquee
              pauseOnHover={true}
              autoFill={true}
              speed={similarProducts.length > 6 ? 50 : 0}
            >
            {similarProducts.map((item) => {
              return (
                <>
                  {item._id !== product._id && (
                    <div dir="rtl" id={item._id} key={item._id} className="m-3">
                      <div className="p-1 card h-100 rounded-4 product-card border-1 border-secondary position-relative">
                        {" "}
                        {/* <div
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
                        </div> */}
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
                        <div className="card-body">
                          <Link
                            className="text-dark text-decoration-none"
                            to={"/product/" + item._id}
                          >
                            <h5 style={{fontFamily:"elmahdy-bold-font"}} className="card-title text-secondary">{item.ArTitle}</h5>
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
                          <img
                            src="./../add.png"
                            width={27}
                            alt="add"
                            srcSet=""
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
            </Marquee>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div id="productDetails" className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row">
          <div className="d-none d-md-block">
            <h2 className="">عناصر ذات صلة</h2>
          
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
          </div>
        </div>
        <DialogModel
          title={"عليك تسجيل الدخول أولاََ"}
          visible={showModal}
          onHide={() => setShowModal(false)}
          onConfirm={()=>handleLoginNavigate(navigate)}
        />
      </div>
    </>
  );
};

export default Product;
