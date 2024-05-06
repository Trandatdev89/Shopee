import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProduct } from "../../Services/Products";
import SearchList from "./SearchList";
import { CiFilter } from "react-icons/ci";
import { Row, Col } from "antd";
import FilterProduct from "../Filter/FilterProduct";
import "./style.scss";
import LoadingShopee from "../../loading/loading";
import GoBack from "../../GoBack";

function Search() {
  const [param, setParam] = useSearchParams();   
  let titleInput = param.get("title") || "";    //lấy ra của biến title khi truyền qua param nếu không có là chuỗi rỗng
  titleInput = titleInput.toLowerCase();                 //chuyển về chế độ in thường
  const category = param.get("category") || "";         //lấy ra các sản phẩm trong danh mục nếu không có là chuỗi rỗng
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getProduct();   //lấy ra tất cả các sản phẩm
      if (res) {
        const newData = res.filter((item) => {    //lọc ra các item có title input chứa trong item.title và category chứa trong item
          if (
            item.title.toLowerCase()?.includes(titleInput) &&
            item.Category?.includes(category)
          ) {
            return true;
          }
        });

        setData(newData);
       
      }
    };
    fetchAPI();
  }, [titleInput]);   
  
  return (
    <>
      <div className="Search">
        <GoBack/>
      {data.length > 0 ? (
          <Row gutter={[15, 15]}>
            <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
              <div className="Search__filter">
                <h5 style={{ marginBottom: "20px", whiteSpace: "nowrap" }}>
                  <CiFilter /> Bộ lọc tìm kiếm:
                  <FilterProduct data={data} />
                </h5>
              </div>
            </Col>
            <Col xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
              <div className="Search__render">
                <h4 style={{ marginBottom: "20px", marginLeft: "15px" }}>
                  Kết quả tìm kiếm từ khóa: {titleInput}
                </h4>
                <SearchList data={data} category={category} title={titleInput}/>
              </div>
            </Col>
          </Row>
      ) : (
         <h2>Không có dữ liệu phù hợp</h2>
      )}
        </div>
    </>
  );
}
export default Search;
