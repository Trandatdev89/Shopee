import {  Dropdown } from "antd";
import { Link } from "react-router-dom";
import logoCompany from '../../../img/404.jpg';

function DropdownAdmin(props) {
  const { data, companyName } = props;
  const styleCSS={
    "textDecoration":"none",
  }
  const items = [
    {
      key: "1",
      label: (
        <>
          <Link style={styleCSS} to="/">Trang bán hàng</Link>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <Link style={styleCSS} to="/logout-admin">Đăng xuất</Link>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <Link style={styleCSS} to="/blog">Thông báo</Link>
        </>
      ),
    },
  ];
  return (
    <>
      <Dropdown
        menu={{ items }}
      >
        <div className="HeaderAdmin__company">
          <div className="HeaderAdmin__img">
            <img src={data.thumbnail?(data.thumbnail):(logoCompany)} alt="loading..." />
          </div>
          <div className="HeaderAdmin__content">
            <div>Nhà bán hàng:</div>
            <div className="HeaderAdmin__user">{companyName}</div>
          </div>
        </div>
      </Dropdown>
    </>
  );
}

export default DropdownAdmin;
