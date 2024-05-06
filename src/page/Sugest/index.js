import { useEffect, useState } from "react";
import { get } from "../../utils/requestAPI";
import {Row,Col,Pagination} from "antd"
import ProductItem from "../Search/productItem";
import { Link } from "react-router-dom";

function Sugest() {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await get("products");
      const result=await get(`products?_page=${skip}&_limit=12`)   //lấy ra tất cả sản phẩm và show ra
      setData(result);
      setTotal(res);
    };
    fetchAPI();
  }, [skip]);

  const handleChange = async (e, f) => {
    setSkip(e);  //set trang page của sản phẩm mỗi khi người dùng click vào số page trang
  };
  
  return (
    <>
      {data.length > 0 && (
        <div className="Sugest">
          <div className="Sugest__title">gợi ý hôm nay</div>
          <div className="Sugest__main">
          <div className="Search__list">
          <Row gutter={[10, 10]}>
            {data.map((item) => (
              <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} key={item.id}>
                <Link to={`/products/${item.id}`} style={{textDecoration:"none",color:"#000"}}>
                  <ProductItem item={item} />
                </Link>
              </Col>
            ))}
            <Col span={24}>
              <div className="mt-3" style={{ textAlign: "center" }}>
                <Pagination
                  defaultCurrent={1}
                  pageSize={12}
                  total={total.length}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
        </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sugest;
