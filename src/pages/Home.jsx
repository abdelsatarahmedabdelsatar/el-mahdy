import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../redux/action";
import { Main } from "../components";
import Products from "./../components/Products/Products";
import Shields from "./../components/Shields/index";
import ProductLine from "./../components/Products/ProductLine";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig/instance";

function Home() {
  const dispatch = useDispatch();
  const [mainCategory, setMainCategory] = useState([]);

  useEffect(() => {
    dispatch(fetchDataFromApi());
    axiosInstance
      .get("api/v1/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        setMainCategory(res.data.data.data.filter((c) => c.isMain));
        console.log(res.data.data.data);
      })
      .catch((err) => {
        if (err.response.data.message.includes("please login again")) {
          localStorage.removeItem("access-token");
          window.location.reload();
        }
      });
  }, []);

  return (
    <>
      <div className="container">
        <Main />
        <ProductLine title={"الأكثر شيوعاََ"} route={"./search/category 2"} />
        <div className="wider-card">
          <Products category={"category 2"} />
        </div>
        {mainCategory.map((m) => {
          return (
            <div key={m._id}>
              <ProductLine title={m.ArName} route={"./search/" + m.EnName} />
              <Products category={m.EnName} />
            </div>
          );
        })}
        <Shields />
        {/* <div className="row m-2 mb-5">
          <img
            src="./4-02.png"
            alt="advertisement image"
            className="border shadow-sm p-0 rounded-1"
          />
        </div> */}
        <div className="position-relative mb-5">
          {" "}
          <p
            className="bg-warning text-center position-absolute p-2 px-3 rounded-3"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "16px",
            }}
          >
            منتجات مخفضة
          </p>
          <div className="border small-arrow wider-card border-1 border-dark rounded-2 py-2 ">
            <div className="row justify-content-end m-3">
              <div
                className="col-1 d-flex align-items-center"
                style={{ width: "120px", fontSize: "12px" }}
              >
                <Link
                  to={"./search/category 2"}
                  className="py-1 px-2 border border-1 border-dark text-decoration-none text-dark rounded-3"
                >
                  عرض الكل
                </Link>
              </div>
            </div>

            <Products category={"category 2"} />
          </div>
        </div>
      </div>
      <div
        className="row gx-0 justify-content-end align-items-center ps-5"
        style={{ backgroundColor: "#EEE" }}
      >
        <div className="col-md-5">
          <h5 className="my-4">فريق كامل يعمل من أجلك</h5>
          <p>
            شركة إعلانية سعودية متخصصة منذ عــــام 1999 في السوق المحليوالدولي
            بتقديم خدمات الدعاية والإعـلان والتصميـــم والطبـــاعة الرقميـــة
            والدروع والهدايـــا الدعائيــــــة ((وين ما تروح مالك الا شركة
            ممدوح))
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img src="./isometric.png" className="my-2" width={500} alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
