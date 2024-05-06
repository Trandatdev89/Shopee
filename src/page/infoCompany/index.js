import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../Services/Company";
import { Col, Row } from "antd";
import LoadingShopee from "../../loading/loading";
import GoBack from "../../GoBack";

//Component này vẽ ra thông tin của shop đó
function InfoShop() {
  const param = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getCompanyById(param.id);
      setData(res);
    };
    fetchAPI();
  }, []);
  return (
    <>
      <div className="CompanyDetails">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "var(--color-one)",
          }}
        >
          Chi tiết Shop
        </h1>
        <GoBack/>
        {data ? (
          <Row>
            <Col span={24}>
              <div className="CompanyDetails__wrap">
                <div className="mb-2">
                  Tên công ty :<strong>{data.companyName}</strong>
                </div>
                <div className="mb-2">
                  Email :<strong>{data.email}</strong>
                </div>
                <div className="mb-2">
                  SDT :<strong>{data.phone}</strong>
                </div>
                <div className="mb-2">
                  Địa chỉ :<strong>{data.address}</strong>
                </div>
                <div className="mb-2">
                  Số lượng nhân sự :<strong>{data.quantityPeople}</strong>
                </div>
                <div className="mb-2">
                  Link website:
                  <strong>{data.website}</strong>
                </div>
                <div className="mb-2">
                  Mô tả
                  <strong>:{data.desc}</strong>
                </div>
              </div>
            </Col>
          </Row>
        ):(
            <LoadingShopee/>
        )}
      </div>
    </>
  );
}

export default InfoShop;
