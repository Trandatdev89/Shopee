import { useEffect, useState } from "react";
import { Button, Card, Flex, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
// import DeleteCV from "./DeleteCV";
import { getOrderByIdCompany } from "../../Services/Order";
import { get } from "../../utils/requestAPI";
import { getCookie } from "../../Components/helper/cookie";
import DeleteOrder from "./delOrder";
import SendOrder from "./SendOrder";
import GoBack from "../../GoBack";
// import GoBack from "../GoBack";
// import LoadingAnimation from "../Loading";


function ManageOrder(){
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const id = getCookie("idAdmin");
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getOrderByIdCompany(id);   //Lấy những đơn hàng của công ty đang đăng nhập    
      const result = await get("products");  //Lấy ra tất cả những sản phẩm
      const MergeProduct_order = [];  //Lấy ra thông tin của sản phẩm dựa trên idProduct API order và hợp thành key infoProduct 
      for (let i = 0; i < res.length; i++) {
        MergeProduct_order.push({
          ...res[i],
          infoProduct: result.find((item) => item.id === res[i].idProduct),
        });
      }

     
     
      setData(MergeProduct_order);
    };
    fetchAPI();
  }, [reload]);
 
  const coloumns = [
    {
      key: "fullName",
      dataIndex: "fullName",
      title: "Họ tên",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      key: "title",
      title: "Tên sản phẩm",
      render: (_, record) => {
        return <>{record.infoProduct.title}</>;
      },
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Số điện thoại",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Số lượng",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "addressRecipt",
      dataIndex: "addressRecipt",
      title: "Địa chỉ nhận hàng",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
    },
    {
      key: "status",
      title: "Trạng thái gửi",
      render:(_,record)=>{
          return(
            <>
               {record.statusSend?(
                <Tag color="success">Đã gửi</Tag>
               ):(
                <Tag color="red">Chưa gửi</Tag>
               )}
            </>
          )
      },
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
                justifyContent: "space-between",
              }}
            >
              <SendOrder  record={record}
                  onReload={setReload}
                  reload={reload}/>
              <Tooltip title="Xóa Order">
                <DeleteOrder
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
  return (
    <>
      <div style={{ padding: "30px 0" }}>
        <h3
          style={{
            color: "#C43820",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Danh sách đặt hàng
        </h3>
        <GoBack />
        {data.length > 0 ? (
          <Card title="Danh sách các đơn hàng" style={{ overflowX: "scroll" }}>
            <Table dataSource={data.reverse()} columns={coloumns} rowKey="id" />
          </Card>
        ) : (
          <h3 style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"20px"}}>Chưa có đơn hàng</h3>  
        )}
      </div>
    </>
  );
}

export default ManageOrder;
