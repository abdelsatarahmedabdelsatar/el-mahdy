import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomNavbar from "./CustomNavbar";
import { fetchDataFromApi } from "../../redux/action";
import axiosInstance from "../../axiosConfig/instance";

const Navbar = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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
        console.log(res.data.data.data);
      });
    dispatch(fetchDataFromApi());
  }, []);
  const state = useSelector((state) => state.handleCart);
  const activateRoute = ({ isActive, isPending }) =>
    isActive ? "nav-link text-warning" : "nav-link text-secondary";
  return (
    <>
      <div className="sticky-top">
        <nav
          className="navbar navbar-expand-lg p-0 border-bottom border-secondary"
          style={{ backgroundColor: "#ffcc1b" }}
        >
          <div
            className="collapse navbar-collapse justify-content-evenly"
            id="navbarSupportedContent1"
            style={{ fontSize: "0.85rem" }}
          >
            <NavLink className="nav-link me-2" to={"/"}>
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
                  <div className="text-dark text-decoration-none fw-bold fs-6 p-0 ">
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
            <form
              dir="rtl"
              className="example rounded-2"
              action="/action_page.php"
            >
              <button type="submit" className="rounded-start-3">
                <i className="fa fa-search"></i>
              </button>
              <input
                type="text"
                placeholder="بحث في الموقع ..."
                name="search"
                className="rounded-end-3"
              />
            </form>
            <ul className="navbar-nav p-0">
              <li className="nav-item">
                <div className=" d-flex align-items-center justify-content-end">
                  <div className="row">
                    <div className="col-12 d-flex align-items-center">
                      {" "}
                      <img
                        src="./../Icons-02.png"
                        width={33}
                        alt=""
                        srcSet=""
                      />
                      <NavLink
                        to="/profile"
                        className="fw-bold nav-link px-0 mx-0"
                      >
                        أدخل لحسابك
                      </NavLink>
                      {/* <NavLink
                          className="text-dark text-decoration-none m-0 p-0"
                          to="/register"
                        >
                          سجل الان
                        </NavLink> */}
                    </div>
                  </div>
                  <a href="#" className="fw-bold nav-link p-0 m-0 px-4">
                    مشتريـاتـك
                  </a>

                  {/* <NavLink to="/register" className={activateRouteIcon}><i className="fa fa-user-plus "></i></NavLink> */}
                  <NavLink to="/cart" className="nav-link">
                    <div className="position-relative">
                      <img
                        src="./../icon-cart.png"
                        width={35}
                        alt=""
                        srcSet=""
                      />
                      <span
                        className="position-absolute translate-middle badge border border-1 border-dark rounded-pill bg-light text-dark"
                        style={{ fontSize: "7.33px", top: "9px", left: "15px" }}
                      >
                        {state.length}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <nav
          style={{ backgroundColor: "#f7f7f7" }}
          className="navbar navbar-expand-lg navbar-light py-2 justify-content-center"
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
              className="collapse navbar-collapse m-0"
              id="navbarSupportedContent"
            >
              {categories.map((c) => {
                return (
                  <Link to={"category/" + c._id} key={c._id}>
                    {" "}
                    <CustomNavbar
                      title={c.ArName}
                      supTitles={subCategories.filter(
                        (s) => s.category._id == c._id
                      )}
                    />
                  </Link>
                );
              })}
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
    </>
  );
};

export default Navbar;
