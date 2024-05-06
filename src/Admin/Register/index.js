import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import generateToken from "../../Components/helper/generateToken";
import { getCompany, postCompany } from "../../Services/Company";

function RegisterAdmin() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [spining,setSpining]=useState(false);
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values) => {
    setSpining(true);
    const res = await getCompany();
    const result = res.find((item) => item.email === values.email);
    if (result) {
      messageApi.open({
        type: "error",
        content: "Email này đã tồn tại.Vui lòng chọn Email khác để đăng ký!",
      });
    } else {
      values.token = generateToken();
      const resultFinal = await postCompany(values);
      form.resetFields();
      if (resultFinal) {
        setSpining(false);
        messageApi.open({
          type: "success",
          content: "Đăng ký thành công",
        });
        navigate("/login-admin");
      } else {
        setSpining(false);
        messageApi.open({
          type: "error",
          content: "Đăng ký thất bại",
        });
      }
    }
  };
  return (
    <>
      {contextHolder}
      <div className="register">
        <div className="container">
          <div className="register__box">
            <h2 style={{ textAlign: "center" }}>Đăng ký tài khoản Admin</h2>
            <Spin spinning={spining} tip="Đang đăng ký">
            <Form onFinish={handleFinish} layout="vertical" form={form}>
              <Form.Item label="Tên tài khoản" name="companyName" rules={rules}>
                <Input placeholder="Nhap Tên công ty..." />
              </Form.Item>
              <Form.Item label="Nhập SDT" name="phone" rules={rules}>
                <Input placeholder="Nhập SDT..." />
              </Form.Item>
              <Form.Item label="Nhập Email" name="email" rules={rules}>
                <Input placeholder="Nhập Email..." />
              </Form.Item>
              <Form.Item label="Nhập mật khẩu" name="password" rules={rules}>
                <Input.Password placeholder="Nhập mật khẩu..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" style={{width:"100%"}} htmlType="submit">
                  Đăng ký
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

export default RegisterAdmin;
