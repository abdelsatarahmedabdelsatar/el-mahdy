import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ImageUpload = ({ setImage, imagePath }) => {
  const [perviewImage, setPerviewImage] = useState(null);
  useEffect(() => {
    return () => {
      setImage(null);
    };
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    let reader = new FileReader();

    reader.onload = (event) => {
      setPerviewImage(event.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  let selectFileFrontCover = () => {
    document.getElementById("userImage").click();
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" ,marginTop:"30px"}}>
      <input
        style={{ display: "none" }}
        type="file"
        id="userImage"
        accept="image/*"
        onChange={handleImageChange}
      />

      {perviewImage ? (
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "20px",
          }}
          onClick={selectFileFrontCover}
        >
          <img
            src={perviewImage}
            alt="Selected"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) 
      : imagePath ? (
        <img
          onClick={selectFileFrontCover}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "20px",
          }}
          src={"https://elmahdy.onrender.com/" + imagePath}
        />
      ) 
      : (
        <img
          onClick={selectFileFrontCover}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "10px",
          }}
          src={"./profile_picture.jpg"}
        />
      )}
    </div>
  );
};


export default ImageUpload;
