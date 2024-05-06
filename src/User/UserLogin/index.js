import { Dropdown } from "antd";
import { getCookie } from "../../Components/helper/cookie";
import { UserOutlined } from "@ant-design/icons";
import "../style.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../Services/Users";


//Component này là mục đích hiển thị dropdown của người dùng và show ra 
function UserLogin() {    

  const fullName = getCookie("fullName");
  const idUser = getCookie("id");
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      const User = await getUserById(idUser);   //lấy ra user đang đăng nhập trả về 1 obj
      setData(User);
    };
    fetchAPI();
  }, []);

  //biến items sẽ là đóng vai trò show ra những item khi hover vào dropdown
  const items = [
    {
      key: "1",
      label: (
        <>
          <div className="dropdownUser__hover">  
            <Link to="/infoUser">Tài khoản của tôi</Link>  
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="dropdownUser__hover">
            <Link to="/order-finish">Đơn mua</Link>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div className="dropdownUser__hover">
            <Link to="/logout">Đăng xuất</Link>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="dropdownUser"> 
        <Dropdown
          arrow
          menu={{ items }}
          dropdownRender={(menu) => (
            <>
              <div className="dropdownUser__body">{menu}</div>
            </>
          )}
        >
          <div className="dropdownUser__render">
            <div>
              {data.thumnail ? (
                <img src={data.thumnail} className="dropdownUser__img" alt="loading..." />
              ) : (
                <UserOutlined />
              )}
            </div>
            <div>{fullName}</div>
          </div>
        </Dropdown>
      </div>
    </>
  );
}

export default UserLogin;
