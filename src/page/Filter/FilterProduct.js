import { Button, Form, Radio, Select, Space } from "antd";
import { useDispatch } from "react-redux";
import { reloadHeader, sendData, sortPrice} from "../../Actions";
function FilterProduct(props) {
  const { data = [] } = props;
  const rules=[
    {
      required: true,
      message: 'Please input your filter!',
    },
  ]
 
  const dispatch = useDispatch();
  const options = [
    {
      value: "Giá thấp đến cao",
      label: "Giá thấp đến cao",
    },
    {
      value: "Giá cao đến thấp",
      label: "Giá cao đến thấp",
    },
    {
      value: "Giảm giá nhiều",
      label: "Giảm giá nhiều",
    },
  ];
  
  const handleFinish = async (e) => {
    
    let merger1 = [];
    if (e.location) {
      merger1=data.filter(item=>item.city===e.location);   //lọc ra các sản phẩm có location ở radio
    }
   
    let merger2 = [];     //lọc ra các sản phẩm có số sao ở radio
    if (e.rate) {
      if (e.rate === "3 sao trở lên") {
        merger2 = merger1.filter((item) => item.rating >= 3);
      } if (e.rate === "4 sao trở lên") {
        merger2 = merger1.filter((item) => item.rating >= 4);
      } if (e.rate === "5 sao")  {
        merger2 = merger1.filter((item) => item.rating >= 2);
      }
    }
    if (e.price) {
      dispatch(sortPrice(e.price));     //gửi lên reducer 1 chuỗi có giá trị là sắp xếp tăng dần hoặc giảm dần 
    }
    
    dispatch(sendData(merger2));    //gửi những dữ liệu sau khi lọc lên reducer
    
  };

  return (
    <>
      <div className="Search__multiple">
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lọc sản phẩm
            </Button>
          </Form.Item>
          <Form.Item name="location" label="Nơi bán" rules={rules}>
            <Radio.Group name="location">
              <Space direction="vertical">
                <Radio value="Hà Nội">Hà Nội</Radio>
                <Radio value="TPHCM">TP Hồ Chí Minh</Radio>
                <Radio value="Đà Nẵng">Đà Nẵng</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="price" label="Sắp xếp giá" rules={rules}>
            <Select options={options} />
          </Form.Item>
          <Form.Item name="rate" label="Đánh giá" rules={rules}>
            <Radio.Group name="rate">
              <Space direction="vertical">
                <Radio value="3 sao trở lên">3 sao trở lên</Radio>
                <Radio value="4 sao trở lên">4 sao trở lên</Radio>
                <Radio value="5 sao">5 sao</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default FilterProduct;
