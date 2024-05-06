import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../Services/Category";
import { Row, Col } from "antd";
function Category() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const resCate = await getCategory();   //lấy ra tất cả các category
      setData(resCate);
    };
    fetchAPI();
  }, []);
  
  return (
    <>
      {data.length > 0 && (
        <div className="Category">
          <h2 style={{color:"#000",opacity:"0.6",padding:"10px"}}>Danh mục</h2>  
          <Row>
            {data.map((item) => (
              <Col key={item.key} xxl={3} xl={3} lg={3} md={3} sm={6} xs={6}>
                <Link style={{textDecoration:"none"}} to={`/search?category=${item.value || ""}`}>   
                  <div className="Category__box">
                    <div className="Category__img">
                      <img src={item.thumbnail} alt="loading..." />
                    </div>
                    <p className="Category__desc">{item.value}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

export default Category;
