import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../Services/Order";
import { MdOutlineTableRows } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import GoBack from "../GoBack";
import { Col, Row } from "antd";

function TranformFinish() {
  const param = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getOrderById(param.id);
      setData(res);
    };
    fetchAPI();
  }, []);

  return (
    <>
      <GoBack />
      <div className="step-wizard">
        <Row>
          <Col span={24}>
            <ul className="step-wizard-list">
              <li className="step-wizard-item">
                <span className="progress-count">
                  <MdOutlineTableRows />
                </span>
                <span className="progress-label">Đơn hàng đã đặt</span>
              </li>
              <li
                className={
                  data.statusSend
                    ? "step-wizard-item"
                    : "step-wizard-item current-item"
                }
              >
                <span className="progress-count">
                  <FaTruckMoving />
                </span>
                <span className="progress-label">Đang vận chuyển</span>
              </li>
              <li className="step-wizard-item">
                <span className="progress-count">
                  {" "}
                  <FaRegStar />
                </span>
                <span className="progress-label">Đơn đã hoàn thành</span>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default TranformFinish;
