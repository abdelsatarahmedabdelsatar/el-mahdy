import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../redux/action";
import { Main } from "../components";
import Products from "./../components/Products/Products";
import Shields from "./../components/Shields/index";
import ProductLine from "./../components/Products/ProductLine";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, []);

  return (
    <>
      <div className="container">
        <Main />
        <ProductLine
          title={"الأكثر مبيعا"}
          route={"./search/category 2"}
        />{" "}
        <div className="wider-card">
          <Products category={"category 2"} />
        </div>
        <ProductLine title={"لوحــــات"} route={"./search/category 1"} />{" "}
        <Products category={"category 1"} />
        <ProductLine title={"هدايــــا"} route={"./search/category 2"} />{" "}
        <Products category={"category 2"} />
        <Shields />
        {/* <div className="row m-2 mb-5">
          <img
            src="./4-02.png"
            alt="advertisement image"
            className="border shadow-sm p-0 rounded-1"
          />
        </div> */}
        <div className="position-relative">
          {" "}
          <p
            className="bg-warning fs-6 text-center position-absolute p-2 px-3 rounded-3"
            style={{ left: "50%", transform: "translate(-50%, -50%)" }}
          >
            مطبوعات ورقية
          </p>
          <div className="border small-arrow wider-card border-1 border-dark rounded-2 py-2 m-5">
            <div className="row justify-content-end m-2">
              <div
                className="col-1 d-flex align-items-center"
                style={{ width: "120px" }}
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
