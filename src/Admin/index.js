import { Badge, Col, Progress, Row } from "antd";
import { CgLoadbarDoc } from "react-icons/cg";
import { FaDocker } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import "./index.scss";
import { CiBitcoin } from "react-icons/ci";
import Chart from "./Chart/ChartLine";
import ChartPie from "./Chart/ChartPie";
import ChartColumns from "./Chart/ChartColumns";
import { useEffect, useState } from "react";
import { getProductByIdCompany } from "../Services/Products";
import { getCookie } from "../Components/helper/cookie";
import { getOrderByIdCompany } from "../Services/Order";
import { getCompanyById } from "../Services/Company";
import GoBack from "../GoBack";
function Admin() {
  const [data,setData]=useState([]);
  const [dataOrder,setDataOrder]=useState([]);
  const [info,setInfo]=useState([]);
  const idAdmin=getCookie("idAdmin");
  useEffect(()=>{
    const fetchAPI=async()=>{
      const res=await getProductByIdCompany(idAdmin);
      const result=await getOrderByIdCompany(idAdmin);
      const infoCompany=await getCompanyById(idAdmin);
      let option = {
        orderCount: 0,
        orderOn: 0,
        orderOff: 0,
      };
      if (result.length > 0) {
        option.orderCount = result.length;
        result.forEach((item) => {
          item.statusSend ? option.orderOn++ : option.orderOff++;
        });
      }
      setInfo(infoCompany);
      setDataOrder(option);
      setData(res);
    }
    fetchAPI();
  },[]);
  
 
  return (
    <>
      <GoBack/>
      <div className="Admin">
        <Row gutter={[15, 15]}>
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className="Admin__box">
              <div className="Admin__icon">
                <CiBitcoin />
              </div>
              <div className="Admin__text">
                <span>Tổng số sản phẩm:</span>
                <span>{data.length} sản phẩm</span>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className="Admin__box">
              <div className="Admin__icon">
                <CgLoadbarDoc />
              </div>
              <div className="Admin__text">
                <span>Tổng đơn hàng: {dataOrder.orderCount}</span>
                <span>Đơn đã gửi: {dataOrder.orderOn}</span>
                <span>Đơn chưa gửi: {dataOrder.orderOff}</span>
              </div>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className="Admin__box">
              <div className="Admin__icon">
                <CiUser />
              </div>
              <div className="Admin__text">
                <span>Thông tin công ty</span>
                <span>Tên công ty: {info.companyName}</span>
                <span>Địa chỉ: {info.address}</span>
                <span>SDT: {info.phone}</span>
                <span>Email: {info.email}</span>
              </div>
            </div>
          </Col>
        </Row>
        <div className="Admin__chart">
          <Row gutter={[20, 40]}>
            <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
              <div className="Admin__chartLine">
                <h4>Nhu cầu đặt hàng theo danh mục theo các năm:</h4>
                <Chart />
              </div>
            </Col>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
              <div className="Admin__chartPie">
                <h4>Thống kê số lượng Order</h4>
                <ChartPie />
              </div>
            </Col>
          </Row>
        </div>
        <div className="statisic">
          <h2 style={{ marginBottom: "30px" }}>
            Thống kê tuyển dụng các vị trị theo hàng tháng:
          </h2>
          <Row gutter={[20, 20]}>
            <Col xxl={10} xl={10} lg={10} md={24} sm={24} xs={24}>
              <div className="statisic__box">
                <Row gutter={[10, 20]}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="statisic__scale">
                      <div className="statisic__title">Tester</div>
                      <div className="statisic__salary">$23,523</div>
                      <div className="statisic__flex">
                        <Badge dot color="purple">
                          Monthly
                        </Badge>
                        <p>70%</p>
                      </div>
                      <div>Goal</div>
                      <div>
                        <Progress percent={70} strokeColor="blue" />
                      </div>
                    </div>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="statisic__scale">
                      <div className="statisic__title">Tester</div>
                      <div className="statisic__salary">$23,523</div>
                      <div className="statisic__flex">
                        <Badge dot color="red">
                          Monthly
                        </Badge>
                        <p>70%</p>
                      </div>
                      <div>Goal</div>
                      <div>
                        <Progress percent={70} strokeColor="blue" />
                      </div>
                    </div>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="statisic__scale">
                      <div className="statisic__title">Tester</div>
                      <div className="statisic__salary">$23,523</div>
                      <div className="statisic__flex">
                        <Badge dot color="blue">
                          Monthly
                        </Badge>
                        <p>70%</p>
                      </div>
                      <div>Goal</div>
                      <div>
                        <Progress percent={70} strokeColor="blue" />
                      </div>
                    </div>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="statisic__scale">
                      <div className="statisic__title">Tester</div>
                      <div className="statisic__salary">$23,523</div>
                      <div className="statisic__flex">
                        <Badge dot color="green">
                          Monthly
                        </Badge>
                        <p>70%</p>
                      </div>
                      <div>Goal</div>
                      <div>
                        <Progress percent={70} strokeColor="blue" />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xxl={14} xl={14} lg={14} md={24} sm={24} xs={24}>
              <div className="statisic__chart">
                <ChartColumns/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Admin;
