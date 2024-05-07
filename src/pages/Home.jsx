import { Navbar, Main, Product, Footer } from "../components";
import Shields from "./Shield";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../redux/action";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataFromApi());
  }, []);

  return (
    <>
      <div className="container">
        

        <Main />

        <Product />
        <Shields />
      </div>
    </>
  );
}

export default Home;
