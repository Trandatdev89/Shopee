import { Button, Input, Spin, message,Form } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate } from "react-router-dom";
import {setCookie} from '../../Components/helper/cookie';
import { getCompany } from "../../Services/Company";
import { reloadHeader } from "../../Actions";
import "./index.scss";
import { getUser } from "../../Services/Users";
function Login() {
  const rules = [
    {
      required: true,
      message: "Please input your information!",
    },
  ];
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [spining, setSpining] = useState(false);


  const handleFinish = async (values) => {
    setSpining(true);
    const res = await getUser();   
    const result = res.find(
      (item) => item.email === values.email && item.password === values.password   //kiểm tra username và password có tồn tại hay không
    );
    if (result) {  //nếu có set những dự liệu dưới đây vào cookie
      setCookie("id", result.id, 1);
      setCookie("fullName", result.fullName, 1);
      setCookie("email", result.email, 1);
      setCookie("token", result.token, 1);
      setSpining(false);
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
      dispatch(reloadHeader(true));
      navigate("/");
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
            <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
            <Spin spinning={spining} tip="Đang đăng nhập">
              <Form onFinish={handleFinish} layout="vertical">
                <Form.Item label="Nhập email" name="email" rules={rules}>
                  <Input placeholder="Nhập email..." />
                </Form.Item>
                <Form.Item label="Nhập mật khẩu" name="password" rules={rules}>
                  <Input.Password placeholder="Nhập mật khẩu..." />
                </Form.Item>
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

export default Login;
