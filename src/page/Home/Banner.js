import { Row, Col, Carousel } from "antd";
import anh1 from "../../img/vn-50009109-41ff07edc9d41572f5805a6a026f25ae_xxhdpi.jpg";
import anh2 from "../../img/vn-50009109-44278e876d9607f6ad3550a2d52489d8_xxhdpi.jpg";
import anh3 from "../../img/vn-50009109-f891bf84ca4b5dcb1265f604cc31cec3_xxhdpi.jpg";
import anh4 from "../../img/vn-50009109-0764bfc536b6a96a07ff31cefd6ee564_xhdpi.jpg";
import anh5 from "../../img/vn-50009109-1b4b0a599acd07070bf237cd41818cfa_xhdpi.png";
import anh6 from "../../img/vn-50009109-c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi.png";
import anh7 from "../../img/extra.png";
import anh8 from "../../img/shoppe.png";
import anh9 from "../../img/outlet.png";
import anh10 from "../../img/internet.png";
import anh11 from "../../img/vnd.png";

function Banner() {
  return (
    <>
      <div className="Banner">
        <div className="Banner__advertise">
          <Row gutter={[10, 10]}>
            <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
              <div className="Banner__carousel">
                <Carousel autoplay>
                  <div className="Banner__wrap">
                    <img src={anh1} alt="đang tải ảnh" />
                  </div>
                  <div className="Banner__wrap">
                    <img src={anh2} alt="đang tải ảnh" />
                  </div>
                  <div className="Banner__wrap">
                    <img src={anh3} alt="đang tải ảnh" />
                  </div>
                </Carousel>
              </div>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
              <div className="Banner__toggle">
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <div className="Banner__img">
                      <img src={anh5} alt="loading" />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="Banner__img">
                      <img src={anh4} alt="loading" />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className="Banner__Voucher">
          <Row gutter={[10, 10]}>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="Banner__tag">
                <img src={anh6} alt="loading..." />
                <p className="Banner__desc">Miễn phí Ship- Có Shopee</p>
              </div>
            </Col>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="Banner__tag">
                <img src={anh7} alt="loading..." />
                <p className="Banner__desc">Voucher Giảm Đến 500.000Đ</p>
              </div>
            </Col>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="Banner__tag">
                <img src={anh8} alt="loading..." />
                <p className="Banner__desc">Shopee Siêu Rẻ</p>
              </div>
            </Col>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="Banner__tag">
                <img src={anh9} alt="loading..." />
                <p className="Banner__desc">Hàng Hiệu Outlet Giảm 50%</p>
              </div>
            </Col>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="Banner__tag">
                <img src={anh10} alt="loading..." />
                <p className="Banner__desc">Hàng quốc tế</p>
              </div>
            </Col>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
              <div className="Banner__tag">
                <img src={anh11} alt="loading..." />
                <p className="Banner__desc">Mã giảm giá</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <hr/>
    </>
  );
}

export default Banner;
