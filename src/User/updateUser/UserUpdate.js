import { Button, DatePicker, Form, Input, Radio, Spin, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateUser } from "../../Services/Users";

function UserUpdate(props) {
  const { data,setReload,reload } = props;
  const [spining, setSpining] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const param = useParams();
  const [Edit, IsEdit] = useState(true);
  const handleFinish = async (value) => {
    setSpining(true);
    const res = await updateUser(param.id, value);
    if (res) {
      setSpining(false);
      setReload(!reload);
      messageApi.open({
        type: "success",
        content: "Cập nhập thành công",
      });
    } else {
      setSpining(false);
      messageApi.open({
        type: "error",
        content: "Cập nhập thất bại",
      });
    }
  };
  console.log(data);
  return (
    <>
      {contextHolder}
      <Spin spinning={spining} tip="Đang cập nhập">
        <Form
          initialValues={data}
          size="large"
          layout="vertical"
          disabled={Edit}
          onFinish={handleFinish}
        >
          <Form.Item label="Tên tài khoản" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính" name="sex">
            <Radio.Group name="sex">
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
              <Radio value="Giới tính khác">Giới tính khác</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Ngày sinh" name="date">
            <DatePicker/>
          </Form.Item>
          <Form.Item label="Avatar" name="thumnail">
            <Input placeholder="gián link ảnh avatar vào đây..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhập
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}

export default UserUpdate;
