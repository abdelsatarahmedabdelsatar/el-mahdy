import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import axiosInstance from "../axiosConfig/instance";
import { toast } from "sonner";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [productColor, setProductColor] = useState("");
  const dispatch = useDispatch();

  const addProduct = (pp) => {
    axiosInstance
      .post(
        "api/v1/cart",
        {
          productId: pp._id,
          color: productColor,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then(() => {
        toast.success("تم إضافة المنتج بنجاح");
      });

    dispatch(addCart(pp));
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
                src="https://cdn-icons-png.flaticon.com/512/1440/1440523.png"
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
                onClick={() => addProduct(product)}
              >
                إضافة الي السلة
              </button>
              <Link to="/cart" className="btn btn-outline-warning">
                الذهاب الي السلة
              </Link>
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
            {similarProducts.map((item) => {
              return (
                <div key={item._id} className="card mx-4 text-center shadow-sm">
                  <Link to={"/product/" + item._id} className="btn  m-1">
                    <img
                      className="card-img-top p-3"
                      src={
                        "https://cdn-icons-png.flaticon.com/512/1440/1440523.png"
                      }
                      alt="Card"
                      height={200}
                      width={200}
                    />
                  </Link>
                  <div className="card-body">
                    {" "}
                    <Link to={"/product/" + item._id} className="btn  m-1">
                      <h5 className="card-title">
                        {item.ArTitle.substring(0, 15)}...
                      </h5>
                    </Link>
                  </div>
                  <div className="card-body">
                    <button
                      className="cart-button btn btn-sm m-1 w-100 rounded-5"
                      onClick={() => addProduct(item)}
                    >
                      إضافة الي السلة
                      <i className="fa-solid fa-bag-shopping me-2"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div id="productDetails" className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row">
          <div className="d-none d-md-block">
            <h2 className="">عناصر ذات صلة</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={similarProducts.length > 4 ? 50 : 0}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
