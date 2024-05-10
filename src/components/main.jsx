import React from "react";
import SlideShow from "./slideShow";

const Home = () => {
  const images = [
    "./4-01.png",
    "./4-02.png",
    "./4-03.png",
    // Add more image URLs as needed
  ];

  return (
    <>
      <div className="row gx-0 my-3 shadow-sm">
        <div>
          <SlideShow images={images} interval={2500} />
        </div>
      </div>
     
    </>
  );
};

export default Home;
