import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig/instance";
import SlideShow from "./slideShow";

const Advertisements = () => {
  const [miliSec, setMili] = useState(0);
  // const [images, setImages] = useState([]);

  const images = [
    "./4-01.png",
    "./4-02.png",
    "./4-03.png",
  ];

  useEffect(() => {
    axiosInstance
      .get("api/v1/settings/6645f573b0c3ba6f3ced3e9c", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // setImages(res.data.data.images);
        setMili(res.data.data.numberOfSecondForImage);
      });
  }, []);

  return (
    <>
      {
        images && miliSec>0 && <div className="row gx-0 my-3 shadow-sm">
        <div>
          <SlideShow images={images} interval={miliSec} />
        </div>
      </div>
      }
    </>
  );
};

export default Advertisements;
