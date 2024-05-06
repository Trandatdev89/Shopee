import { SiShopee } from "react-icons/si";
import { BarsOutlined, LogoutOutlined,HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { getCookie } from "../../../Components/helper/cookie";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCompanyById } from "../../../Services/Company";
import DropdownAdmin from "../DropdowmAdmin";
function HeaderAdmin(props) {
  const { open, setOpen } = props;
  const tokenAdmin = getCookie("tokenAdmin");
  const idCompany = getCookie("idAdmin");
  const companyName = getCookie("CompanyName");
  const [data, setData] = useState([]);
  const reload = useSelector((state) => state.sortRender);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getCompanyById(idCompany);
      setData(res);
    };
    fetchAPI();
  }, []);
  
  return (
    <>
      <div className="HeaderAdmin">
        <div className="HeaderAdmin__logo">
          <Link to="/admin">
            <span>
              <SiShopee />
              Shopee{" "}
            </span>
            Kênh Người Bán
          </Link>
        </div>
        {tokenAdmin ? (
          <div className="HeaderAdmin__bars">
            <Button icon={<BarsOutlined />} onClick={handleClick}>
              Menu
            </Button>
          </div>
        ) : (
          ""
        )}
        {tokenAdmin ? (
          <div className="HeaderAdmin__todo">
            <DropdownAdmin data={data} companyName={companyName}/>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default HeaderAdmin;
