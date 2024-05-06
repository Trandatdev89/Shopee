import { useEffect, useState } from "react";
import { getOrderByIdUser, patchOrder } from "../../Services/Order";
import { getCookie } from "../../Components/helper/cookie";
import { Form, Col, Input, Row, Button, notification, Card } from "antd";
import { getUserById } from "../../Services/Users";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reloadHeader } from "../../Actions";

function PayDetails() {
  const { dataOrder } = useParams();
  const parsedCheckItem = JSON.parse(dataOrder);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const kk=useSelector(state=>state.sortRender);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const id = getCookie("id");
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getUserById(id); //Lấy ra User đang đăng nhập
      const result = await getOrderByIdUser(id); //Lấy ra đơn đặt hàng của user đó
      setData(res);
      setOrder(result);
    };
    fetchAPI();
  }, []);
  useEffect(() => {
    form.resetFields(); //Mục đích để initialValues được hoạt động
  }, [data]);

  const handleFinish = async (value) => {
    const sendOrder = order.filter((item) => {
      return parsedCheckItem.some((subItem) => subItem.idCheckbox === item.id);
    }); //Lọc ra những đơn hàng có trạng thái là chưa gửi

    let res;
    for (let i = 0; i < sendOrder.length; i++) {
      const merge = {
        ...sendOrder[i], //hợp nhất các đơn hàng chưa gửi và kèm thêm thông tin của người đặt hàng
        ...value,
      };
      res = await patchOrder(merge.id, merge);
    }
    if (res) {
      api.success({
        message: "Đặt hàng thành công",
        description: "Sản phẩm đã được mua", //Đoạn này thông báo ra màn hình
        placement: "top",
      });
      dispatch(reloadHeader(!kk));
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      api.error({
        message: "Đặt hàng khong thành công",
        description: "Sản phẩm chua được mua",
        placement: "top",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <div className="PayDetails__list">
        <h3
          style={{
            textAlign: "center",
            margin: "25spx 0",
            color: "var(--color-one)",
          }}
        >
          Điền thông tin vào form dưới đây:
        </h3>
        <Card title="Form mua hàng">
          {data && (
            <Form
              layout="vertical"
              initialValues={data}
              onFinish={handleFinish}
              form={form}
            >
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <Form.Item name="fullName" label="Họ và tên">
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="email" label="email">
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="phone" label="SDT">
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="addressRecipt" label="Địa chỉ nhận hàng">
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Đặt hàng
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Card>
      </div>
    </>
  );
}

export default PayDetails;
