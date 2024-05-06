import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../Services/Products";
import { Col, Rate, Row, message } from "antd";
import bitton from "../../img/quantity.png";
import "./style.scss";

import { getCompany } from "../../Services/Company";
import { getCookie } from "../../Components/helper/cookie";
import {
  getOrderByIdProduct,
  patchOrder,
  postOrder,
} from "../../Services/Order";
import { useDispatch, useSelector } from "react-redux";
import { reloadHeader } from "../../Actions";
import LoadingShopee from "../../loading/loading";
import GoBack from "../../GoBack";

function ProductDetails() {
  const param = useParams();
  const idUser = parseInt(getCookie("id"));
  const kk = useSelector((state) => state.sortRender);
  const navigate = useNavigate();
  const token = getCookie("token");
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getProductById(param.id);   //lấy ra các sản phẩm theo id
      const result = await getCompany();
      const merger = {
        ...res,
        infoCompany: result.find((item) => item.id === res.idCompany),
      };
      setData(merger);
    };
    fetchAPI();
  }, []);

  const handleClick = async (idProduct) => {
    if (token) {    //trong trường hợp đăng nhập mới cho đặt hàng
      const result = await getOrderByIdProduct(idProduct, idUser);  //lấy ra những đơn đặt hàng của của user đó

      if (result.length > 0) {    //nếu đơn đó đã tồn tại thì có thể mà người dùng muốn tăng số lượng 
        const res = await patchOrder(result[0].id, { quantity: quantity });
        if (res) {
          messageApi.open({
            type: "success",
            content: "Thêm sản phẩm vào giỏ thành công",
          });
        }
      } else {
        const res = await postOrder({    //nếu chưa thì tạo đơn đó vào api order
          idCompany: data.idCompany,
          idProduct: data.id,
          idUser: idUser,
          quantity: quantity,
          statusSend: false,
        });
        if (res) {
          messageApi.open({
            type: "success",
            content: "Thêm sản phẩm vào giỏ thành công",
          });

          dispatch(reloadHeader(!kk));  //render lại cái giỏ hàng để cập nhập
        }
      }
    } else {
      alert("Bạn chưa đăng nhập.Vui lòng đăng nhập");
      navigate("/login");
    }
  };

  const handleBuy = async (id) => {
    if (token) {
      const res = await postOrder({
        idCompany: data.idCompany,
        idProduct: data.id,
        idUser: idUser,
        quantity: quantity,
        statusSend: false,
      });
      dispatch(reloadHeader(true));
      if (res) {
        navigate("/order");
      }
    } else {
      alert("Bạn chưa đăng nhập.Vui lòng đăng nhập");
      navigate("/login");
    }
  };
  
  
  return (
    <>
      {contextHolder}
      <GoBack />
      {data ? (
        <div className="Product">
          <div className="Product__main">
            <Row gutter={[15, 15]}>
              <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                <div className="Product__img">
                  <img src={data.thumbnail} alt="loading..." />
                </div>
              </Col>
              <Col xxl={16} xl={16} lg={16} md={16} sm={24} xs={24}>
                <div className="Product__content">
                  <div className="Product__title">
                    <span>Yêu Thích</span> {data.title}
                  </div>
                  <div className="Product__rate">
                    {data.rating} <Rate value={5} />
                  </div>
                  <div className="Product__bitton">
                    <img src={bitton} alt="loading..." />
                  </div>
                  <div className="Product__sale">
                    <div>
                      <span>Giá:</span> {data.price} VND
                    </div>
                    <div>
                      <span>Giảm giá:</span> {data.discountPercentage}%
                    </div>
                  </div>
                  <div className="Product__stock">
                    <span>Tồn kho:</span> {data.stock}sp
                  </div>
                  <div className="Product__tranform">
                    <span>Vận chuyển: </span>
                    <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png" />
                    Miễn phí vận chuyển
                  </div>
                  <div className="Product__quatity">
                    <span>Số lượng: </span>

                    <button
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <input type="number" min={1} value={quantity} />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <div className="Product__btn">
                    <button
                      className="Product__btn Product__btn--plus"
                      onClick={() => handleClick(data.id)}
                    >
                      Thêm vào giỏ hàng
                    </button>

                    <button
                      className="Product__btn Product__btn--buy"
                      onClick={() => handleBuy(data.id)}
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="Product__author">
            <Row>
              <Col span={24}>
                <div className="Product__company">
                  <div className="Product__logo">
                    <img src={data?.infoCompany?.thumbnail} alt="loading..." />
                  </div>
                  <div className="Product__info">
                    <h4>{data?.infoCompany?.companyName}</h4>
                    <p>Online 25 Phút Trước</p>
                    <Link to={`/info-shop/${data?.infoCompany?.id}`} style={{textDecoration:"none"}}>
                      <button>Xem Shop</button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="Product__desc">
            <h3 style={{ padding: " 30px 40px" }}>CHI TIẾT SẢN PHẨM</h3>
            <Row>
              <Col span={24}>
                <div className="Product__base">
                  <div>
                    <span>Danh Mục:</span>
                    {data.Category}
                  </div>
                  <div>
                    <span>Đánh giá:</span>
                    {data.rating}
                  </div>
                  <div>
                    <span>Mức giá:</span>
                    {data.price}
                  </div>
                  <div>
                    <span>Giảm giá:</span>
                    {data.discountPercentage}
                  </div>
                  <div>
                    <span>Tồn kho:</span>
                    {data.stock}
                  </div>
                  <div>
                    <span>Địa chỉ:</span>
                    {data.city}
                  </div>
                  <div>
                    <span>Hãng:</span>
                    {data.brand}
                  </div>
                  <div>
                    <span>Mô tả:</span>
                    {data.description}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <LoadingShopee />
      )}
    </>
  );
}

export default ProductDetails;
