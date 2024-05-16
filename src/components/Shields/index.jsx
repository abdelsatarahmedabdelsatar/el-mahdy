import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig/instance";

const Shields = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("api/v1/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setCategories(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // const toggleFav = (eve) => {
  //   eve.target.classList.toggle("text-danger");
  // };
  const Loading = () => {
    return (
      <>
        <div className="col-md-2 col-sm-6 col-12 mb-4">
          <Skeleton height={172} />
        </div>
        <div className="col-md-2 col-sm-6 col-12 mb-4">
          <Skeleton height={172} />
        </div>
        <div className="col-md-2 col-sm-6 col-12 mb-4">
          <Skeleton height={172} />
        </div>
        <div className="col-md-2 col-sm-6 col-12 mb-4">
          <Skeleton height={172} />
        </div>
        <div className="col-md-2 col-sm-6 col-12 mb-4">
          <Skeleton height={172} />
        </div>
        <div className="col-md-2 col-sm-6 col-12 mb-4">
          <Skeleton height={172} />
        </div>
      </>
    );
  };

  const ShowShields = () => {
    return (
      <>
        <div className="py-4">
          <div className="constainer row justify-content-start me-3">
            {categories.map((cat) => {
              return (
                <Link
                  key={cat._id}
                  to={"category/" + cat._id}
                  className="text-decoration-none card py-3 text-center d-flex align-items-center m-3 category-card"
                >
                  <img
                    src={
                      "./product_img.jpg"
                    }
                    alt="cat image"
                    width={40}
                    srcSet=""
                    className="mt-3"
                  />
                  <p className="pt-3">{cat.ArName}</p>
                </Link>
              );
            })}
          </div>
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
            <div className="position-relative py-3">
              <hr />
              <p
                className="position-absolute bg-white border border-dark p-2 fs-6 rounded-2"
                style={{ top: "9px", left: "45%" }}
              >
                تسويق بالأرقام
              </p>
              <ShowShields />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shields;
