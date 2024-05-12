import { Button, Card, Col, Row, Table, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
// import "./index.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import UpdateJob from "./UpdateJob";
// import DeleteJob from "./DeleteJob";
import { getCookie } from "../../Components/helper/cookie";
import UpdateProduct from "./updateProduct";
import { getProductByIdCompany } from "../../Services/Products";
import DeleteProduct from "./delProduct";
import GoBack from "../../GoBack";
// import GoBack from "../GoBack";
// import LoadingAnimation from "../Loading";

function ManagerProduct() {
  const navigate = useNavigate();
  const id = getCookie("idAdmin");
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getProductByIdCompany(id);
      setData(res);
    };
    fetchAPI();
  }, [reload]);
  const columns = [
    {
      key: "title",
      dataIndex: "title",
      title: "Tên sản phẩm",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      key: "Category",
      dataIndex: "Category",
      title: "Thể loại",
      render: (_, record) => {
        return (
          <Tag style={{ marginBottom: "5px" }} color="orange">
            {record.Category}
          </Tag>
        );
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá(VND)",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      sorter: (a, b) => parseInt(a.salary) - parseInt(b.salary),
    }
    ,
    {
      key: "city",
      dataIndex: "city",
      title: "Thành phố",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "stock",
      dataIndex: "stock",
      title: "Số lượng còn lại",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "discountPercentage",
      dataIndex: "discountPercentage",
      title: "Sale",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "createAT",
      dataIndex: "createAt",
      title: "Ngày tạo",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "brand",
      dataIndex: "brand",
      title: "Hãng",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "action",
      title: "Hành động",
      render: (_, record) => {
        return (
          <>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to={`/products/${record.id}`}>
                <Tooltip title="xem chi tiết">
                  <Button className="ms-1" icon={<EyeOutlined />} />
                </Tooltip>
              </Link>
              <Tooltip title="Cập nhập sản phẩm">
                <UpdateProduct
                  record={record}
                  onReload={setReload}
                  reload={reload}
                />
              </Tooltip>
              <Tooltip title="Xóa sản phẩm">
                <DeleteProduct
                  record={record}
                  onReload={setReload}
                  reload={reload}
                />
              </Tooltip>
            </div>
          </>
        );
      },
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
  ];
  const handleClick = () => {
    navigate("/create-product");
  };
  return (
    <>
      
      <Row>
        <Col span={24}>
          <div style={{ padding: "30px 0" }}>
            <h3
              style={{
                color: "#C43820",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Danh sách các sản phẩm
            </h3>
            <GoBack />
            {data ? (
              <Card
                style={{ overflowX: "scroll", height: "100vh" }}
                title="Danh sách các sản phẩm"
                extra={
                  <Button
                    onClick={handleClick}
                    size="middle"
                    style={{ marginLeft: "20px" }}
                    type="primary"
                  >
                    + Tạo mới sản phẩm
                  </Button>
                }
              >
                <Table
                  rowKey="id"
                  dataSource={data.reverse()}
                  columns={columns}
                />
              </Card>
            ) : (
              //   <LoadingAnimation />
              <h3 style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}}>Chưa có sản phẩm nào</h3>  
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ManagerProduct;
