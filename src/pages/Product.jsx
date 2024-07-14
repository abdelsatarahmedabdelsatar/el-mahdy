import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig/instance";
import { handleAdd, handleLoginNavigate } from "../helpers/api";
import DialogModel from "../components/Dialogs";
import Cards from "../components/Cards";
import { useDispatch } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [related, setRelated] = useState("");

  const [newValues, setNewValues] = useState([]);

  // const handleCartNavigate = () => {
  //   if (localStorage.getItem("access-token")) {
  //     navigate("/cart");
  //   } else {
  //     setShowModal(true);
  //   }
  // };

  // change when editing any option in the retutred options .........
  let time;
  const changeProductOptionsValue = (eve, id) => {
    // if (eve.target.files) {

    //   clearTimeout(time);
    //   time = setTimeout(() => {
    //     setNewValues(
    //       product_obj().map((v) =>
    //         v.id == id ? { ...v, value: eve.target.value} : v
    //       )
    //     );
    //   }, 2000);
    // } else {
      clearTimeout(time);
      time = setTimeout(() => {
      setRelated(eve.target.value);

        setNewValues(
          product_obj().map((v) =>
            v.id == id ? { ...v, value: eve.target.value } : v
          )
        );
      }, 2000);
    // }
  };

  const ChooseType = (o, options, option_id) => {
    // var [valueChanged, setValueChanged] = useState();
    return (
      <>
        <div>{getType(o, options, option_id)}</div>
      </>
    );
  };

  const getType = (obj, options, option_id) => {
    if (obj.type === "Input") {
      return (
        <>
          <div key={obj._id} className="row mt-4 align-items-center mx-0">
            <div className="col-6">
              {obj.ArName}
              {obj.moreMoney ? (
                <span className="text-danger me-4" style={{ fontSize: "14px" }}>
                  +{obj.moreMoney} ر.س
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="col-6 pe-0">
              <input
                defaultValue={options.find((o) => o.id == obj._id).value}
                onChange={(event) => changeProductOptionsValue(event, obj._id)}
                type="text"
                placeholder={`أدخل ${obj.ArName}`}
                className="form-control"
              />
            </div>
          </div>
          {obj.relatedId &&
            // valueChanged == options.find((o) => o.id == obj._id).value ||
            // valueChanged == obj.relatedValue &&
            getType(obj.relatedId, options, option_id)}
        </>
      );
    } else if (obj.type === "TextArea") {
      return (
        <>
          <div key={obj._id} className="row mt-4 align-items-center mx-0">
            <div className="col-6">{obj.ArName}</div>
            <div className="col-6 pe-0">
              <textarea
                defaultValue={options.find((o) => o.id == obj._id).value}
                onChange={(event) => changeProductOptionsValue(event, obj._id)}
                placeholder={`أدخل ${obj.ArName}`}
                className="form-control"
              />
            </div>
          </div>
          {obj.relatedId &&
            // valueChanged == options.find((o) => o.id == obj._id).value) ||
            // valueChanged == obj.relatedValue) &&
            getType(obj.relatedId, options, option_id)}
        </>
      );
    } else if (obj.type === "File") {
      return (
        <>
          <div key={obj._id} className="row mt-4 align-items-center mx-0">
            <div className="col-6">{obj.ArName}</div>
            <div className="col-6 pe-0">
              <input
                id={obj._id}
                defaultValue={options.find((o) => o.id == obj._id).value}
                onChange={(event) => changeProductOptionsValue(event, obj._id)}
                placeholder={`أدخل ${obj.ArName}`}
                className="form-control"
                type="file"
              />
              {/* <ImageUpload /> */}
            </div>
          </div>
        </>
      );
    } else if (obj.type === "DropDown") {
      return (
        <>
          <div key={obj._id} className="row mt-4 align-items-center mx-0">
            <div className="col-6">{obj.ArName}</div>
            <div className="col-6 pe-0">
              <select
                defaultValue={options.find((o) => o.id == obj._id).value}
                onChange={(event) => changeProductOptionsValue(event, obj._id)}
                className="form-control"
                name=""
                id=""
              >
                <option value={""}>اختر</option>
                {obj.supplayData.map((d, i) => {
                  return (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {obj.relatedId &&
            // related == options.find((o) => o.id == obj._id).value ||
            related == obj.relatedValue &&
            getType(obj.relatedId, options, option_id)}
        </>
      );
    } else {
      return (
        <>
          <div key={obj._id} className="row mt-4 align-items-center mx-0">
            <div className="col-6">{obj.ArName}</div>
            <div className="col-6 pe-0">
              <input
                type="text"
                placeholder={`${obj.ArName} أدخل`}
                className="form-control"
              />
            </div>
          </div>
          {obj.relatedId &&
            // valueChanged == options.find((o) => o.id == obj._id).value ||
            // valueChanged == obj.relatedValue &&
            getType(obj.relatedId, options, option_id)}
        </>
      );
    }
  };

  const renderOptions = ({ options, product }) => {
    return product?.options.map((o, i) => {
      return <div key={i}>{ChooseType(o, options, product._id)}</div>;
    });
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
          if (err.response.data.message.includes("please login again")) {
            localStorage.removeItem("access-token");
            window.location.reload();
          }
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
          console.log(res.data);
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

  const product_obj = () => {
    let listOfOptions = product.options.map((x) => ({
      id: x._id,
      value: "",
    }));

    if (newValues.length) {
      listOfOptions = newValues;
    } else {
      product.options.forEach((x) => {
        if (x.relatedId) {
          listOfOptions.push({ id: x.relatedId._id, value: "" });
        }
      });
    }

    return listOfOptions;
  };

  const Loading = () => {
    return (
      <>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-5">
              <Skeleton height={400} width={500} />
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
        <div className=" my-5 ps-5">
          <div className="row gx-0 justify-content-between">
            <div className="col-md-6 col-sm-12 text-center p-0">
              <img
                className="img-fluid"
                // src={product?.image}
                src="./product_img.jpg"
                alt={product?.ArTitle}
              />
            </div>
            <div className="col-md-6 col-sm-12 p-0 pe-3">
              {/* <h4 className="text-uppercase text-muted">{product.category}</h4> */}
              <h2>{product?.ArTitle}</h2>
              {/* <h4 className="text-muted mb-1">{product?.EnTitle}</h4> */}
              {/* <p className="lead text-warning">
                {product.rating && product.rating.rate}
                <i className="fa fa-star"></i>
              </p> */}
              <span className="d-flex align-items-center">
                <h5 className="list-group-item mx-1 text-decoration-line-through lead text-secondary">
                  {+product?.price}
                </h5>{" "}
                ر.س
                <h3 className="text-danger me-4 ms-1  mt-2">
                  {product?.priceAfterDiscount}
                </h3>{" "}
                ر.س
              </span>

              <p className="lead text-muted">{product?.ArDescription}</p>
              <p className="lead text-muted">{product?.EnDescription}</p>

              <div className="card mb-4 rounded-1 bg-white border border-1">
                <div className="card-body ">
                  {/* deleting options from product details */}

                  {/* <select
                    value={productColor}
                    onChange={(e) => setProductColor(e.target.value)}
                    className="form-select d-inline w-50 my-4"
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
                  </select> */}
                  {product &&
                    renderOptions({
                      options: product_obj(),
                      product: product,
                    })}
                  <div className="row justify-content-between mb-3 mt-4">
                    <div className="col-auto mt-4">السعر</div>
                    <div className="col-auto ms-3">
                      <span
                        style={{ fontSize: "14px" }}
                        className="text-decoration-line-through text-secondary row justify-content-end"
                      >
                        {+product?.price} ر.س
                      </span>

                      <span className="text-danger row justify-content-end fs-5">
                        {product?.priceAfterDiscount} ر.س
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(event) => {
                      event.target.disabled = true;
                      handleAdd(
                        product._id,
                        newValues,
                        dispatch,
                        setShowModal,
                        event
                      );
                      // event.target.disabled = false;
                    }}
                    className="btn btn-warning btn-md btn-block"
                  >
                    إضافة للسلة
                  </button>
                </div>
              </div>

              {/* <button
                className="btn btn-warning mx-1"
                onClick={() => handleAdd(product, dispatch)}
              >
                إضافة الي السلة
              </button>
              <button
                onClick={handleCartNavigate}
                className="btn btn-outline-warning"
              >
                الذهاب الي السلة
              </button> */}
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
              <Skeleton height={330} width={225} />
            </div>
            <div className="mx-4">
              <Skeleton height={330} width={225} />
            </div>
            <div className="mx-4">
              <Skeleton height={330} width={225} />
            </div>
            <div className="mx-4">
              <Skeleton height={330} width={225} />
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
          <div className="row">
            {/* <Marquee
              pauseOnHover={true}
              autoFill={true}
              speed={similarProducts.length > 6 ? 50 : 0}
            > */}
            <Cards data={similarProducts.filter(p => p._id != product._id)} />
            {/* </Marquee> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="row bg-light gx-0">
        {loading ? <Loading /> : <ShowProduct />}
      </div>
      <div id="productDetails" className="container mt-5">
        <div className="row">
          <div className="">
            <div className="d-flex justify-content-start">
              <h5 className="col-md-3 col-5 col-lg-2">منتجات قد تعجبك</h5>
              <hr className="col-md-9 col-7 col-lg-9" />
            </div>

            {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
          </div>
        </div>
        {/* <AuthDialog
        visible={showModal}
        onHide={() => setShowModal(false)}
      /> */}
        <DialogModel
          visible={showModal}
          onHide={() => setShowModal(false)}
          onConfirm={() => handleLoginNavigate(navigate)}
          title="عليك تسجيل الدخول أولاًً "
        />
      </div>
    </>
  );
};

export default Product;
