import "./style.scss";

function Footer() {
  return (
    <>
      <div className="Footer">
        <div className="container">
          <ul className="Footer__list">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <li>CHÍNH SÁCH BẢO MẬT</li>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <li>QUY CHẾ HOẠT ĐỘNG</li>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <li>CHÍNH SÁCH VẬN CHUYỂN</li>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <li>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</li>
              </div>
            </div>
          </ul>
          <div className="Footer__logo">
            <div className="Footer__img">
              <img src="https://accounts.topdev.vn/asset/images/logo_bocongthuong.jpgx" />
            </div>
            <div className="Footer__content">Công ty TNHH Shopee</div>
          </div>
          <div className="Footer__contact">
            <p className="Footer__decs">
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
              Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng
              đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            </p>
            <p className="Footer__decs">
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại
              liên hệ: 024 73081221 (ext 4678){" "}
            </p>
            <p className="Footer__decs">
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội
              cấp lần đầu ngày 10/02/2015{" "}
            </p>
          </div>
          <hr/>
          <div className="Footer__copy">
            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
