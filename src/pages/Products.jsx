import React from "react";
import { Footer, Navbar, Product } from "../components";

const Products = () => {
  return (
    <>
      <Navbar />
      <div className="bg-light pt-3">
        <Product />
        <Footer />
      </div>
    </>
  );
};

export default Products;
