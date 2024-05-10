import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig/instance";
import { toast } from "sonner";
import ProductLine from "../Products/ProductLine";
import Cards from "../Cards/index";
const CategoryRoute = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const addProduct = (product) => {
    axiosInstance
      .post(
        "api/v1/cart",
        {
          productId: product._id,
          color: "",
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

    dispatch(addCart(product));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const getProducts = async () => {
      await axiosInstance
        .get("api/v1/product?limit=1000000", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          setProducts(res.data.data.data.filter((p) => p.category._id == id || p.subCategory._id == id));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };

    getProducts();
  }, [id]);

  const Loading = () => {
    return (
      <>
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

        {products.length > 0 ? (
          <Cards data={products} />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5 bg-light text-center text-secondary">
                <i
                  className="fa-solid fa-xmark p-4 rounded-circle"
                  style={{
                    fontSize: "4rem",
                    backgroundColor: "#EEE",
                    color: "#BBB",
                    width: "110px",
                  }}
                ></i>
                <h6 className="p-3">لا يوجد منتجات</h6>
                <Link to="/" className="btn btn-outline-warning mx-4 rounded-5">
                  عودة للرئيسية
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center my-5">
          {loading ? (
            <Loading />
          ) : (
            <>
              <ShowProducts />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryRoute;
