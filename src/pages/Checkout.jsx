import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Checkout = () => {
  const state = useSelector((state) => state.handleCart);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4 border-0">
                  <h5 className="mb-0 p-3">ملخص الطلب</h5>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    المنتجات ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    شحن
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>المبلغ الإجمالي</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4 border-0">
                  <h4 className="mb-0 p-3">عنوان وصول الفواتير</h4>
                <div className="card-body">
                  <form className="needs-validation" novalidate>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label for="firstName" className="form-label">
                          الإسم الأول
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                        مطلوب اسم أول صالح.
                        </div>
                      </div>

                      <div className="col-sm-6 my-1">
                        <label for="lastName" className="form-label">
                          الإسم الاخير
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                        مطلوب اسم اخير صالح.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="email" className="form-label">
                          الميل
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                        />
                        <div className="invalid-feedback">
                        الرجاء إدخال عنوان بريد إلكتروني صالح للشحن
                           التحديثات.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label">
                          العنوان
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="1234 Main St"
                          required
                        />
                        <div className="invalid-feedback">
                        يرجى إدخال عنوان الشحن الخاص بك.
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="address2" className="form-label">
                          العنوان 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder="Apartment or suite"
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label for="country" className="form-label">
                          البلد
                        </label>
                        <br />
                        <select className="form-select" id="country" required>
                          <option value="">اختر...</option>
                          <option>ُEgypt</option>
                        </select>
                        <div className="invalid-feedback">
                        الرجاء تحديد بلد صالح.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label for="state" className="form-label">
                        ولاية
                        </label>
                        <br />
                        <select className="form-select" id="state" required>
                          <option value="">اختر...</option>
                          <option>Qena</option>
                        </select>
                        <div className="invalid-feedback">
                        يرجى تقديم حالة صالحة.
                        </div>
                      </div>

                      <div className="col-md-3 my-1">
                        <label for="zip" className="form-label">
                        الرمز البريدي 
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                        الرمز البريدي مطلوب.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">الدفع</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label for="cc-name" className="form-label">
                        الاسم على البطاقة
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          placeholder=""
                          required
                        />
                        <small className="text-muted">
                        الاسم الكامل كما هو معروض على البطاقة                        </small>
                        <div className="invalid-feedback">
                        الاسم الموجود على البطاقة مطلوب
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label for="cc-number" className="form-label">
                        رقم البطاقة الائتمانية
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                        رقم بطاقة الائتمان مطلوب
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-expiration" className="form-label">
                        انتهاء الصلاحية
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                        تاريخ انتهاء الصلاحية مطلوب
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-cvv" className="form-label">
                         رمز الحماية
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                        مطلوب رمز الحماية                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button
                      className="w-100 btn btn-success"
                      type="submit" 
                    >
                      الاستمرار
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="bg-light">
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
