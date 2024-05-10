import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        className="row gx-0"
        style={{ backgroundColor: "#666", color: "#FFF", height: "220px" }}
      >
        <div className="row gx-0">
          <div className="col-md-4 p-3">
            <h6 className="my-4">متجر المهدي للاعلان</h6>
            <p>
              شركة اعلانية سعودية متخصصة منـذ عـــام 1999 في السوق المحلي
              والدولي بتقديم خدمــات الدعاية والإعلان والتصميم والطباعة الرقمية
              والدروع والهدايا الدعائية (( وين ما تروح مالك إلا شركة ممدوح ))
            </p>
          </div>

          {/* ====================================================================== */}

          <div className="col-md-3 p-3">
            <h6 className="my-4">روابط مهمة</h6>
            <div className="row text-white">
              <div className="col-5">
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  فروعنا
                </a>
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  معرض أعمالنا
                </a>
              </div>
              <div className="col-7">
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  سياسة الاستخدام
                </a>
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="#"
                  className="d-block my-1 text-decoration-none text-white"
                >
                  سياسة الاسترجاع والاستبدال
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-1"></div>

          {/* ====================================================================== */}

          <div className="col-md-4 text-center d-flex align-items-center p-3">
            <a href="">
              <i className="footer-icon fa-brands fa-instagram "></i>
            </a>
            <a href="">
              <i className="footer-icon fa-brands fa-twitter "></i>
            </a>
            <a href="">
              <i className="footer-icon fa-brands fa-snapchat "></i>
            </a>
            <a href="">
              <i className="footer-icon fa-brands fa-tiktok "></i>
            </a>
            <a href="">
              <i className="footer-icon fa-brands fa-youtube "></i>
            </a>
            <a href="">
              <i className="footer-icon fa-brands fa-facebook-f "></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
