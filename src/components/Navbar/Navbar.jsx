import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomNavbar from "./CustomNavbar";
import { fetchDataFromApi } from "../../redux/action";
import axiosInstance from "../../axiosConfig/instance";
import { handleLoginNavigate } from "../../helpers/api";
import CustomDropdown from "../DropDown";
import DialogModel from "../Dialogs";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [lang, setLang] = useState("AR");
  const [subCategories, setSubCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCart = () => {
    if (localStorage.getItem("access-token")) {
      navigate("/cart");
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("api/v1/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data.data);
        console.log(res.data.data.data);
      });

    axiosInstance
      .get("api/v1/subCategory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        setSubCategories(res.data.data.data);
      });
    dispatch(fetchDataFromApi());
  }, [dispatch]);
  const state = useSelector((state) => state.handleCart);

  return (
    <>
      <div className="sticky-top">
        <nav
          className="navbar navbar-expand-lg p-1 border-bottom border-secondary"
          style={{ backgroundColor: "#ffcc1b" }}
        >
          {" "}
          {/* <button
            className="navbar-toggler p-1 m-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div
            className="navbar-collapse text-center d-flex justify-content-evenly"
            id="navbarSupportedContent1"
            style={{ fontSize: "0.85rem" }}
          >
            <NavLink className="nav-link  py-1" to={"/"}>
              <img src="./../logo_nav.png" height={40} alt="" srcSet="" />
            </NavLink>
            {/* <ul className="navbar-nav d-none-md">
              <li
                style={{ width: "100%" }}
                className="nav-item align-items-center d-flex"
              >
                <img
                  className=" p-0"
                  src="./../Icons-01.png"
                  height={45}
                  alt=""
                  srcSet=""
                />
                <div className=" p-0">
                  <div className="text-dark text-decoration-none  fs-6 p-0 ">
                    الشحــن والتوصيــل
                  </div>
                  <div className="text-dark text-decoration-none m-0">
                    لكل منــاطق المملكـــة
                  </div>
                </div>
              </li>
            </ul> */}
            {/* <span>
               <input
              dir="ltr"
              type="text"
              name=""
              className="form-control border border-1 rounded-0 border-dark shadow-none text-muted"
              style={{
                fontSize: "0.85rem",
                backgroundColor: "#EEE",
                fontFamily: "fontawesome",
                
              }}
              id=""
            />
            <button>&#xf002;</button>
            </span> */}
            <form dir="rtl" className="example rounded-2">
              <button className="rounded-start-3">
                <Link to={"/search/" + searchKey}>
                  <i className="fa fa-search text-secondary"></i>
                </Link>
              </button>
              <input
                type="text"
                placeholder="بحث في الموقع ..."
                name="search"
                className="rounded-end-3"
                value={searchKey}
                onChange={(eve) => setSearchKey(eve.target.value)}
              />
            </form>
            <ul className="navbar-nav p-0">
              <li className="nav-item">
                <div className="">
                  <div className="row">
                    <div className="col-12 align-items-center m-0 p-0 d-none d-md-flex">
                      <img
                        src={lang == "AR" ? "./langs/ar.png" : "./langs/en.png"}
                        className="mt-1"
                        width={20}
                        alt=""
                        srcSet=""
                      />
                      <CustomDropdown
                        title={lang}
                        setLang={setLang}
                        supTitles={["AR", "EN"]}
                      />
                      {localStorage.getItem("access-token") ? (
                        <>
                          <img
                            src="./../Icons-02.png"
                            width={33}
                            alt=""
                            className="me-5"
                            srcSet=""
                          />
                          <NavLink
                            to="/profile"
                            className=" nav-link px-0 mx-2"
                          >
                            أدخل حساب
                          </NavLink>
                        </>
                      ) : (
                        <NavLink to="/login" className=" nav-link mx-2">
                          تسجيل الدخول
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="">
              <div className="row">
                <div className="col-12 align-items-center m-0 p-0 d-none d-md-flex">
                  <div
                    onClick={handleCart}
                    style={{ cursor: "pointer" }}
                    to="/cart"
                    className="nav-link"
                  >
                    <div className="position-relative">
                      <img src="./../add.png" width={33} alt="" srcSet="" />
                      <span
                        className="position-absolute translate-middle border border-1 border-dark rounded-circle bg-light text-dark d-flex align-items-center justify-content-center"
                        style={{
                          zIndex: "200",
                          fontSize: "12px",
                          top: "7px",
                          left: "64px",
                          width: "17px",
                          height: "17px",
                          fontWeight: "lighter",
                        }}
                      >
                        {state.length}
                      </span>
                      السلة
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav
          style={{ backgroundColor: "#f7f7f7" }}
          className="navbar navbar-expand-lg navbar-light py-2 w-100 d-flex justify-content-center"
        >
          <button
            className="navbar-toggler p-1 m-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div>
            <div
              className="collapse navbar-collapse m-0 w-100"
              id="navbarSupportedContent"
            >
              <div className="row justify-content-center">
                {categories.map((c) => {
                  return (
                    <div className="col m-0 p-0" key={c._id}>
                      <Link to={"category/" + c._id} key={c._id}>
                        <CustomNavbar
                          title={c.ArName}
                          supTitles={subCategories.filter(
                            (s) => s.category._id === c._id
                          )}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* <button
                className="m-1"
                type="submit"
                style={{
                  fontSize: "13px",
                  border: "1px solid black",
                  backgroundColor: "#f4f4f4",
                  borderRadius: "2px",
                }}
              >
                طلب عرض السعر
                <i className="fa-solid fa-calculator p-1 fs-6"></i>
              </button> */}
            </div>
          </div>
        </nav>
       
      </div>
      {/* <AuthDialog
        visible={showModal}
        onHide={() => setShowModal(false)}
      /> */}
       <DialogModel
          visible={showModal}
          onHide={() => setShowModal(false)}
          onConfirm={() => {handleLoginNavigate(navigate);setShowModal(false)}}
          title="عليك تسجيل الدخول أولاًً "
        />
    </>
  );
};

export default Navbar;
