import { Button, Input, Spin, message, Form } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../Components/helper/cookie";
import { getCompany } from "../../Services/Company";
import { reloadHeader } from "../../Actions";
import "../index.scss";
function LoginAdmin() {
  const rules = [
    {
      required: true,
      message: "Please input your information!",
    },
  ];
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const kk=useSelector(state=>state.sortRender);
  const [spining, setSpining] = useState(false);
  const handleFinish = async (values) => {
    setSpining(true);
    const res = await getCompany();
    const result = res.find(
      (item) => item.email === values.email && item.password === values.password
    );
    if (result) {
      setSpining(false);
      
      setCookie("idAdmin", result.id, 1);
      setCookie("CompanyName", result.companyName, 1);
      setCookie("emailAdmin", result.email, 1);
      setCookie("tokenAdmin", result.token, 1);
      dispatch(reloadHeader(!kk));
      navigate("/admin");
      messageApi.open({
        type: "error",
        content: "Đăng nhập thất bại",
      });
    } else {
      setSpining(false);
      messageApi.open({
        type: "error",
        content: "Đăng nhập thất bại",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="login">
        <div className="container">
          <div className="login__box">
            <h2 style={{ textAlign: "center" }}>Đăng nhập Admin</h2>
            <Spin spinning={spining} tip="Đang đăng nhập">
              <Form onFinish={handleFinish} layout="vertical">
                <Form.Item label="Nhập email" name="email" rules={rules}>
                  <Input placeholder="Nhập email..." />
                </Form.Item>
                <Form.Item label="Nhập mật khẩu" name="password" rules={rules}>
                  <Input.Password placeholder="Nhập mật khẩu..." />
                </Form.Item>
                <div style={{ fontSize: "18px", margin: "15px 0" }}>
                  Nếu chưa có tài khoản thì đăng ký{" "}
                  <Link to="/register-Admin">tại đây!</Link>
                </div>
                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    size="large"
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAdmin;
