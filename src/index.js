import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./style.css";
import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Auth,
  Checkout,
  PageNotFound,
} from "./pages";
import Profile from "./pages/profile";
import { Toaster } from "sonner";
import { Footer, Navbar } from "./components";
import CategoryRoute from "./components/CategoryRoute";
import Search from "./pages/Search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster
          richColors
          className="toaster"
          expand
          position="bottom-right"
          offset={5}
          dir="rtl"
        />
        <Navbar />
        {localStorage.getItem("access-token") ? (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Products />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/product/*" element={<PageNotFound />} />
              <Route path="/category/:id" element={<CategoryRoute />} />
              <Route path="/sub-category/:id" element={<CategoryRoute />} />
              <Route path="/search/:key" element={<Search />} />
              <Route path="/search/" element={<Search />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/product/*" element={<PageNotFound />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/category/:id" element={<CategoryRoute />} />
            <Route path="/sub-category/:id" element={<CategoryRoute />} />
            <Route path="/search/:key" element={<Search />} />
            <Route path="/search/" element={<Search />} />
          </Routes>
        )}
        <Footer />
      </Provider>
    </BrowserRouter>
  </>
);
