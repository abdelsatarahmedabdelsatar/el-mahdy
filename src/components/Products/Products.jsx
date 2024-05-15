import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axiosInstance from "../../axiosConfig/instance";
import CaroselCards from "./../Cards/CarpselCards";
const Products = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
          setData(
            res.data.data.data.filter((p) => p.category.EnName == category)
          );
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
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={250} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={250} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={250} />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={250} />
        </div>
        
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <CaroselCards data={data} />
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
              <ShowProducts />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
