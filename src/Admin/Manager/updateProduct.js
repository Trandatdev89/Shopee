import { Button, Col, Form, Input,  InputNumber,  Modal, Row,message } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { updateProduct } from "../../Services/Products";


function UpdateProduct(props) {
  const { record ,onReload,reload} = props;
  const [isModel,setModel]=useState(false);
  const [messageAPI, contextHolder] = message.useMessage();
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];
  const handleFinish=async(value)=>{
     value.id=record.id;
     const res=await updateProduct(value.id,value);
     if (res) {
        messageAPI.open({
          type: "success",
          content: "Cập nhập thành công",
          duration: 3,
        });
        onReload(!reload);
        setModel(false);
      } else {
        messageAPI.open({
          type: "error",
          content: "Cập nhập thất bại!",
          duration: 3,
        });
      }
  }
  const handleCancel=()=>{
    setModel(false);
  }
  const handleClick=()=>{
     setModel(true);
  }
  return (
    <>   
     {contextHolder}
      <Button className="ms-1" onClick={handleClick} icon={<AppstoreAddOutlined />} />
      <Modal title="Cập nhập sản phẩm"  open={isModel} footer={null} onCancel={handleCancel} width={1000}>
      <Form layout="vertical" onFinish={handleFinish} initialValues={record}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item name="title" label="Tên sản phẩm" rules={rules}>
                <Input placeholder="Tên sản phẩm..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Category" label="Thể loại" rules={rules}>
                <Input placeholder="Thể loại..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="Thành phố" rules={rules}>
                 <Input placeholder="Thành phố..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="price" label="Mức giá" rules={rules}>
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stock" label="Tồn kho" rules={rules}>
                <InputNumber/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discountPercentage" label="Sale" rules={rules}>
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="brand" label="Hãng" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="description" label="mô ta" rules={rules}>
                <TextArea placeholder="mo ta" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Cập nhập
                </Button>
                <Button type="primary" className="ms-2" onClick={handleClick}>
                  Huy
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateProduct;
