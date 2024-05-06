import { Button, Col, Form, Input, InputNumber, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { postProduct } from "../../Services/Products";
import { getCookie } from "../../Components/helper/cookie";
import { useEffect, useState } from "react";
import { get } from "../../utils/requestAPI";

function CreateProduct() {
  const [cate,setCate]=useState([]);
  const [city,setCity]=useState([]);
  useEffect(()=>{
    const fetchAPI=async()=>{
      const res=await get("category");
      const result=await get("city");
      setCity(result);
      setCate(res);
    }
    fetchAPI();
  },[])
  const rules = [
    {
      required: true,
      message: "Please input your username!",
    },
  ];

  const [messageAPI, contextHolder] = message.useMessage();

  const idCompany = getCookie("idAdmin");
  const [form] = Form.useForm();
  const handleFinish = async (values) => {
   
    values.idCompany = parseInt(idCompany);
    const res = await postProduct(values);
    if (res) {
      form.resetFields();
      messageAPI.open({
        type: "success",
        content: "Tạo mới sản phẩm thành công",
        duration: 3,
      });
    } else {
      messageAPI.open({
        type: "error",
        content: "Tạo mới sản phẩm thất bại!",
        duration: 3,
      });
    }
  };
  const handleClick = () => {
    form.resetFields();
  };
  return (
    <>
      {contextHolder}
      <div className="createJob" style={{ padding: "50px 0" }}>
        <h2>Tạo mới sản phẩm</h2>
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Form.Item name="title" label="Tên sản phẩm" rules={rules}>
                <Input placeholder="Tên sản phẩm..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Category" label="Thể loại" rules={rules}>
                <Select options={cate} placeholder="Thể loại..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="city" rules={rules}>
                <Select options={city} placeholder="Thành phố..."/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="brand" label="Hãng">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="price" label="Mức giá (Nhập số) VND" rules={rules}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discountPercentage" label="Sale" rules={rules}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stock" label="Tồn kho + sp" rules={rules}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="rating" label="Đánh giá (<=5)" rules={rules}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="thumbnail" label="Ảnh sản phẩm (link ảnh)" rules={rules}>
                <Input placeholder="dán link ảnh..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả sản phẩm"
                rules={rules}
              >
                <TextArea placeholder="mo ta" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Thêm sản phẩm
                </Button>
                <Button type="primary" className="ms-2" onClick={handleClick}>
                  Hủy
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
export default CreateProduct;
