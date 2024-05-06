import { useEffect, useState } from "react";
import { delOrder, getOrderById, getOrderByIdUser } from "../Services/Order";
import { getCookie } from "../Components/helper/cookie";
import { getProduct } from "../Services/Products";
import { Card, Col, Row, message } from "antd";
import { getCompany } from "../Services/Company";
import "./style.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reloadHeader } from "../Actions";
import LoadingShopee from "../loading/loading";
import GoBack from "../GoBack";

//Component này dùng để hiển thị những đơn mua
function BuyFinish() {
  const [data, setData] = useState([]);
  const id = getCookie("id");
  const [api, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.sortRender);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getOrderByIdUser(id);
      const totalProduct = await getProduct();
      const totalCompany = await getCompany();

      const merge = [];
      for (let i = 0; i < res.length; i++) {
        merge.push({
          ...res[i],
          info: totalProduct.find((item) => item.id === res[i].idProduct),
          infoCompany: totalCompany.find(
            (item) => item.id === res[i].idCompany
          ),
        });
      }
      const filterOrder = merge.filter((item) => {
        if (item.fullName) {
          return true;
        } else {
          return false;
        }
      });
      setData(filterOrder);
    };
    fetchAPI();
  }, [reload]);

  const handleDel = async (id) => {
    const res = await getOrderById(id);

    if (res.statusSend === true) {
      const result = await delOrder(id);
      if (result) {
        api.open({
          type: "success",
          content: "Xóa sản phẩm thành công",
        });
      }
      dispatch(reloadHeader(true));
    } else {
      api.open({
        type: "info",
        content: "Sản phẩm chưa giao đến,chưa thể xóa",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <GoBack />
      <div className="BuyFinish">
        {data.length > 0 ? (
          <Row gutter={[15, 15]}>
            {data.map((item) => (
              <Col span={24} key={item.id}>
                <Link to={`/tranform-finish/${item.id}`} style={{textDecoration:"none"}}>
                <Card
                  title={item?.infoCompany?.companyName}
                  extra={
                    <div className="BuyFinish__head">
                      <span> Đơn hàng đã được giao thành công</span>
                      <span>
                        {" "}
                        {item.statusSend ? "hoàn thành" : "đang giao"}
                      </span>
                    </div>
                  }
                  style={{
                    width: 300,
                  }}
                >
                  <div className="BuyFinish__body">
                    <div className="BuyFinish__img">
                      <img src={item.info.thumbnail} alt="loading..." />
                    </div>
                    <div className="BuyFinish__content">
                      <div className="BuyFinish__wrap">
                        <h4>{item.info.title}</h4>
                        <div className="BuyFinish__desc">
                          Phân loại hàng: {item.info.Category}
                        </div>
                        <div>Số lượng: x{item.quantity}</div>
                      </div>
                      <div className="BuyFinish__price">
                        Đơn giá: {item.info.price} VND
                      </div>
                    </div>
                  </div>
                  <div className="BuyFinish__foot">
                    <div className="BuyFinish__money">
                      Thành tiền :{item.quantity * item.info.price} VND
                    </div>
                    <div className="BuyFinish__btn">
                      <button
                        className="Product__btn Product__btn--buy"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => handleDel(item.id)}
                      >
                        Xoá
                      </button>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/products/${item.idProduct}`}
                      >
                        <button
                          className="Product__btn Product__btn--buy"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Mua lại
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <LoadingShopee />
        )}
      </div>
    </>
  );
}
export default BuyFinish;
