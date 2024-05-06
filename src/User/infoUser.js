import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../Services/Users";
import { Col, Row, message } from "antd";
import {
  UserOutlined,
  ReconciliationOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import error404 from "../img/404.jpg";
import "./style.scss";
import { Button, Form, Input, Radio } from "antd";
import { getCookie } from "../Components/helper/cookie";
import LoadingShopee from "../loading/loading";
import GoBack from "../GoBack";
import { Link } from "react-router-dom";

//Component này dùng để chỉnh sưa thông tin cá nhân của user
function InfoUser() {
  const id = getCookie("id");
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [Edit, IsEdit] = useState(true);
  const [form] = Form.useForm();
  const [reload, setReload] = useState([]);
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const handleClick = () => {
    IsEdit(false);
  };
  const handleCancel = () => {
    IsEdit(true);
  };

  const fetchAPI = async () => {
    const user = await getUserById(id);
    if (user) {
      setData(user);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, [reload]);

  const handleFinish = async (value) => {
    const res = await updateUser(data.id, value);
    if (res) {
      IsEdit(true);
      setReload(!reload);
      messageApi.open({
        type: "success",
        content: "Cập nhập thành công",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhập thất bại",
      });
    }
  };
  useEffect(() => {
    form.resetFields(); //đoạn này là để giúp initialValue hoạt động
  }, [data]);
  return (
    <>
      {contextHolder}
      <GoBack />
      {data ? (
        <div className="infoUser">
          <Row gutter={[15, 15]}>
            <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
              <div className="infoUser__nav">
                <div className="infoUser__img">
                  <img src={data.thumnail || error404} alt="loading..." />
                  <h5>{data.fullName}</h5>
                </div>
                <hr />
                <div className="infoUser__me">
                  <span>
                    <UserOutlined />{" "}
                  </span>
                  Tài khoản của tôi
                </div>
                <Link to="/order-finish" style={{ textDecoration: "none" }}>
                  <div className="infoUser__order">
                    <span>
                      <ReconciliationOutlined />{" "}
                    </span>
                    Đơn mua
                  </div>
                </Link>
                <Link to="/blog" style={{ textDecoration: "none" }}>
                  <div className="infoUser__notify">
                    <span>
                      <NotificationOutlined />{" "}
                    </span>
                    Thông báo
                  </div>
                </Link>
              </div>
            </Col>
            <Col xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
              <div className="infoUser__main">
                <div
                  className="infoUser__wrap"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3>Hồ sơ của tôi</h3>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                  </div>
                  <div>
                    {Edit ? (
                      <Button type="primary" onClick={handleClick}>
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <Button danger onClick={handleCancel}>
                        Hủy
                      </Button>
                    )}
                  </div>
                </div>
                <hr />
                <div className="infoUser__form">
                  <Form
                    initialValues={data}
                    size="large"
                    layout="vertical"
                    disabled={Edit}
                    form={form}
                    onFinish={handleFinish}
                  >
                    <Form.Item
                      rules={rules}
                      label="Tên tài khoản"
                      name="fullName"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={rules}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Giới tính" name="sex" rules={rules}>
                      <Radio.Group name="sex">
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                        <Radio value="Giới tính khác">Giới tính khác</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Ngày sinh" name="date" rules={rules}>
                      <input type="date" />
                    </Form.Item>
                    <Form.Item label="Avatar" name="thumnail" rules={rules}>
                      <Input placeholder="gián link ảnh avatar vào đây..." />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="middle">
                        Cập nhập
                      </Button>
                      <Button
                        className="ms-2"
                        size="middle"
                        onClick={handleCancel}
                        type="primary"
                        htmlType="submit"
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <LoadingShopee />
      )}
    </>
  );
}

export default InfoUser;
