import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../redux/action";
import { Main } from "../components";
import Products from "./../components/Products/Products";
import Shields from "./../components/Shields/index";
import ProductLine from "../components/Products/ProductLine";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, []);

  return (
    <>
      <div className="container">
        <Main />
        <ProductLine title={"الأكثر مبيعا"} route={"./cart"} />{" "}
        <Products category={"category 2"} />
        <ProductLine title={"لوحــــات"} route={"./cart"} />{" "}
        <Products category={"category 1"} />
        <ProductLine title={"هدايــــا"} route={"./cart"} />{" "}
        <Products category={"category 2"} />
        <Shields />
        <div className="row m-2 mb-5">
          <img
            src="./4-02.png"
            alt="advertisement image"
            className="border shadow-sm p-0 rounded-1"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
