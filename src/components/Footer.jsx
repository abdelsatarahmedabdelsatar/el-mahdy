import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        className="row gx-0 pb-4"
        style={{ backgroundColor: "#EEE", height: "100%" }}
      >
        {/* <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">Made with ❤️ by Abdelsatar Ahmed <i className="fa fa-github"></i>
            </p>
            
              
          </div>
        </div> */}

        <div className="row gx-0">
          <div className="col-md-4 p-3">
            <h6 className="my-4">متجر المهدي للاعلان</h6>
            <p>
              شركة اعلانية سعودية متخصصة منـذ عـــام 1999 في السوق المحلي
              والدولي بتقديم خدمــات الدعاية والإعلان والتصميم والطباعة الرقمية
              والدروع والهدايا الدعائية (( وين ما تروح مالك إلا شركة ممدوح ))
            </p>

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

          {/* ====================================================================== */}

          <div className="col-md-3 p-3">
            <h6 className="my-4">روابط مهمة</h6>

            <a href="#" className="d-block my-3 text-decoration-none a-link">
              فروعنا
            </a>
            <a href="#" className="d-block my-3 text-decoration-none a-link">
              معرض أعمالنا
            </a>
            <a href="#" className="d-block my-3 text-decoration-none a-link">
              سياسة الاستخدام
            </a>
            <a href="#" className="d-block my-3 text-decoration-none a-link">
              سياسة الخصوصية
            </a>
            <a href="#" className="d-block my-3 text-decoration-none a-link">
              سياسة الاسترجاع والاستبدال
            </a>
          </div>

          {/* ====================================================================== */}

          <div className="col-md-4 p-3">
            <h6 className="my-4">تواصل معنا</h6>

            <a href="#" className="d-block my-2 text-decoration-none a-link">
            <i className="footer-icon fa-brands fa-whatsapp"></i>
              +96354656464
            </a>
            <a href="#" className="d-block my-2 text-decoration-none a-link">
            <i className="footer-icon fa-solid fa-mobile-screen"></i>
              +96100924867
            </a>
            <a href="#" className="d-block my-2 text-decoration-none a-link">
            <i className="footer-icon fa-solid fa-phone"></i>
              +96130443872
            </a>
            <a href="#" className="d-block my-2 text-decoration-none a-link">
            <i className="footer-icon fa-solid fa-message"></i>
              store@mamdouhadv.sa
            </a>
            <a href="#" className="d-block my-2 text-decoration-none a-link">
            <i className="footer-icon fa-regular fa-paper-plane"></i>
              https://t.me/s/Mamdouhadv?before=228
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
