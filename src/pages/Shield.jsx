import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import jsonData from "./../data.json"
import ProductLine from "../components/Products/ProductLine";
const Shields = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(jsonData);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getShields = async () => {
      // setLoading(true);
      // const response = await fetch("https://fakestoreapi.com/Shields/");
      // if (componentMounted) {
      //   setData(await response.clone().json());
      //   setFilter(await response.json());
      //   setLoading(false);
      // }
      setData(jsonData)

      return () => {
        componentMounted = false;
      };
    };

    getShields();
  }, []);

  const toggleFav = (eve) => {
    eve.target.classList.toggle('text-danger')
  }
  const Loading = () => {
    return (
      <>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
        <div className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={492} />
        </div>
      </>
    );
  };

  // const filterProduct = (cat) => {
  //   const updatedList = data.filter((item) => item.category === cat);
  //   setFilter(updatedList);
  // };
  const ShowShields = () => {
    return (
      <>
      {/* <div className="d-flex justify-content-center mb-4 mt-2">
      <div className="btn-group btn-group" role="group" aria-label="...">
        
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => setFilter(data)}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>
      </div> */}
      

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-6 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="text-center bg-white m-2  h-100 rounded-1 shadow-sm row border position-relative" key={product.id}>
              <div id='favIcon' onClick={(eve)=>{toggleFav(eve)}} className="position-absolute p-1 rounded-circle bg-light" style={{top:'10px',left:'2%',fontSize:'15px',zIndex:'100',width:'30px', cursor: 'pointer'}}>
                <i className="fa-solid fa-heart"></i>
                </div>
              <div className="col-5 m-0 p-0">
                <Link to={"/product/" + product.id}>
                  <img
                    className="card-img-top h-100 rounded-right"
                    src={product.image}
                    alt="Card"
                    height={300}
                  />
                </Link>
              </div>
                
                <div className="card-body col-7 m-auto">
                  <Link className="text-dark text-decoration-none" to={"/product/" + product.id}>
                    <h5 className="card-title">
                      {product.title.substring(0, 12)}...
                    </h5>
                  </Link>
                  <p className="card-text">
                    {product.description.substring(0, 40)}...
                  </p>
                  <ul className="inline">
                  <li className="list-group-item  lead text-decoration-line-through fs-6 text-muted">$ { +product.price + 50}</li>
                  <li className="list-group-item  lead text-success fs-4">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <button
                    className="cart-button btn btn-md w-75  m-1 rounded-5"
                    
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart <i className="fa-solid fa-bag-shopping me-2"></i>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container-fluid ">
       
        <div className="row justify-content-center">
          {loading ? <Loading /> : 
          <> <ProductLine title={'لوحــــات'} route={'./cart'} /> <ShowShields /></>
         }
        </div>
      
         <div className="row m-2">
          <img src="./4-02.png" alt="advertisement image" className="border shadow-sm p-0 rounded-1"/>
        </div>
      </div>
    </>
  );
};

export default Shields;
