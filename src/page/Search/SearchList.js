import { useEffect, useState } from "react";
import { getCompany } from "../../Services/Company";
import { Row, Col, Pagination } from "antd";
import ProductItem from "./productItem";
import { useSelector } from "react-redux";
import { Paginate } from "../../Services/Paginate";
import { Link } from "react-router-dom";
import LoadingShopee from "../../loading/loading";


//Component này giúp hiển thị ra danh sách các sản phẩm sau khi lọc
function SearchList(props) {
  const { data = [],category,title} = props;
  
 
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const dataRender = useSelector((state) => state.DataRender);    //lấy ra dữ liệu từ reducers DataRender lúc component FilterProduct gửi lên:
  const sortRender = useSelector((state) => state.sortRender);   //lấy ra được trạng thái sắp xếp trên reducers sortRender lúc component FilterProduct gửi lên:
  const [query, setQuery] = useState([]);

  let dataMerge = [];
  if (dataRender.length > 0) {  //kiểm tra xem người dùng có sử dụng bộ lọc hay không,nếu sử dụng bộ lọc thì dataRender sẽ có giá trị và gán lại cho dataMerge
    dataMerge = dataRender;   
    if(dataRender.every(item => data.some(targetItem => targetItem.id === item.id))){   //
         dataMerge = dataRender;
    }
    else{   //còn nếu người dùng sau khi lọc xong muốn bấm tìm kiến sản phẩm khác thì phải gán ngược lại là data
      dataMerge = data;
    }
  } else {
    dataMerge = data;  //nếu không sử dụng bộ lọc thì mặc định gán là data
  }
  
  const handleChange = async (e, f) => {
    setSkip(e);  //set trang page của sản phẩm mỗi khi người dùng click vào số page trang
  };
  
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getCompany();
      const result = [];
      for (let i = 0; i < dataMerge.length; i++) {
        result.push({
          ...dataMerge[i],
          info: res.find((item) => item.id === dataMerge[i].idCompany),   //hợp nhất thành 1 mảng bao gồm dữ liệu sản phẩm và infoCompany
        });
      }
      
      setTotal(result);  //set tổng sản phẩm để làm pagination

      const quantityData = await Paginate(skip,category);  //lấy ra số sản phẩm khi thay đổi vào page trang và gới hạn hiển thị 12 sản phẩm

      const resultFinal = quantityData.filter((item) => {
        return result.some((subItem) => subItem.id === item.id);  //lọc ra những sản phẩm mà người dùng tìm kiếm để làm pagination
      });

      if (sortRender) {
        if (sortRender === "Giá thấp đến cao") {  //dữ liệu khi dispatch từ componet FilterProduct sẽ dc sắp xếp ở dưới đây
          resultFinal.sort((a, b) => {
            return a.price - b.price;
          });
        } else if (sortRender === "Giá cao đến thấp") {
          resultFinal.sort((a, b) => {
            return b.price - a.price;
          });
        } else {
          resultFinal.sort((a, b) => {
            return b.discountPercentage - a.discountPercentage;
          });
        }
      }

      setQuery(resultFinal);
      
    };
    fetchAPI();
  }, [dataMerge, skip,title]);

  return (
    <>
      {query.length > 0 ? (
        <div className="Search__list">
          <Row gutter={[10, 10]}>
            {query.map((item) => (
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
                  pageSize={10}
                  total={total.length}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <LoadingShopee/>
      )}
    </>
  );
}

export default SearchList;
