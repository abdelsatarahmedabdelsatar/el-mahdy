import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
// import jsonData from "./../data.json";
import ProductLine from "./ProductLine";
import axiosInstance from "../axiosConfig/instance";
const Products = () => {
  const [data, setData] = useState([]);
  // const [filter, setFilter] = useState(jsonData);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      await axiosInstance
        .get("api/v1/product?limit=1000000", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setData(res.data.data.data);
          console.log(res.data.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-3 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
      </>
    );
  };

  // const filterProduct = (cat) => {
  //   const updatedList = data.filter((item) => item.category === cat);
  //   setFilter(updatedList);
  // };
  const toggleFav = (eve) => {
    eve.target.classList.toggle("text-danger");
  };
  const ShowProducts = () => {
    return (
      <>
        {/* <div className="d-flex justify-content-center mb-4 mt-2">
      <div className="btn-group btn-group" role="group" aria-label="...">
        
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => setFilter(data)}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>
      </div> */}
        <div className="row justify-content-start">
          {data.map((product) => {
            return (
              <div
                id={product._id}
                key={product._id}
                className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4"
              >
                <div className="card text-center h-100 rounded-4 shadow-sm border-1 position-relative">
                  {" "}
                  <div
                    id="favIcon"
                    onClick={(eve) => {
                      toggleFav(eve);
                    }}
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
                  <Link to={"/product/" + product._id}>
                    <img
                      className="card-img-top shadow-sm"
                      src={
                        "https://cdn-icons-png.flaticon.com/512/1440/1440523.png"
                      }
                      alt="Card"
                      height={300}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      className="text-dark text-decoration-none"
                      to={"/product/" + product._id}
                    >
                      <h5 className="card-title">
                        {product.ArTitle?.substring(0, 12)}...
                      </h5>
                    </Link>
                    <p className="card-text">
                      {product.ArDescription?.substring(0, 40)}...
                    </p>
                  </div>
                  <ul className="">
                    <li className="list-group-item text-decoration-line-through fs-6 lead text-muted">
                      $ {+product?.price}
                    </li>
                    <li className="list-group-item  lead text-success fs-4">
                      $ {product?.priceAfterDiscount}
                    </li>
                    {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                  </ul>
                  <div className="card-body">
                    <button
                      className="cart-button btn  m-1 w-100 rounded-5"
                      onClick={() => addProduct(product)}
                    >
                      Add to Cart{" "}
                      <i className="fa-solid fa-bag-shopping me-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          {loading ? (
            <Loading />
          ) : (
            <>
              {" "}
              <ProductLine title={"هدايا دعائية"} route={"./cart"} />
              <ShowProducts />
            </>
          )}
        </div>
        <div className="row my-4">
          <img
            src="./4-03.png"
            alt="advertisement image"
            className="border shadow-sm p-0 rounded-1"
          />
        </div>
      </div>
    </>
  );
};

export default Products;
