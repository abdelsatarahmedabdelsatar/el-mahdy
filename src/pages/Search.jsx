import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig/instance";
import Cards from "../components/Cards";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { key } = useParams();

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
          setProducts(res.data.data.data.filter((p) => 
          p.category.ArName.includes(key) || p.subCategory.ArName.includes(key) || 
          p.category.EnName.includes(key) || p.subCategory.EnName.includes(key) ||
          p.ArTitle.includes(key) || p.EnTitle.includes(key) ||
          p.ArDescription.includes(key) || p.EnDescription.includes(key) 

          ));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };

    getProducts();
  }, [key]);

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

  const ShowProducts = () => {
    return (
      <>

        {products.length > 0 ? (
          <Cards data={products} />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5 bg-light text-center text-secondary">
                
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

export default Search;
