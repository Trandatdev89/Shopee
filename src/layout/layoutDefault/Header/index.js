import { FaBell, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { SiShopee } from "react-icons/si";
import "./style.scss";
import { Link } from "react-router-dom";
import SearchForm from "./Search";
import { Button } from "antd";
import { getCookie } from "../../../Components/helper/cookie";
import UserLogin from "../../../User/UserLogin/index";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderByIdUser } from "../../../Services/Order";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Bars from "./Bars";


function Header() {
  const token = getCookie("token");
  const tokenAdmin = getCookie("tokenAdmin");      //lấy ra token của admin được lưu vào cookie
  let reload = useSelector((state) => state.sortRender);   //reload được sinh ra với mục đích là reload lại trạng thái của giỏ hàng hoặc đăng nhập đăng ký
  const [data, setData] = useState([]);
  const id = getCookie("id");
  
  const [state, setState] = useState(false);    //state được dùng để cập nhập trạng thái cho thanh bars(vào hoặc đóng)
  const handleClick = () => {
    setState(!state);
  };

  useEffect(() => {
    const fetchAPI = async () => {       
      const res = await getOrderByIdUser(id);    //lấy ra những đơn đặt hàng của user đang đăng nhập thông qua id
      const filter = res.filter((item) => item.statusSend === false && (item.fullName===null|| item.fullName===undefined));  //chỉ lấy ra những đơn đặt hàng mà chỉ ở giỏ chứ chưa đăng ký để hiển thị số lượng sản phẩm
      setData(filter);
    };
    fetchAPI();
  }, [reload]);
 
  

  return (
    <>
    
      <div className="Header">
        <div className="container">
          <div className="Header__user">
            <div className="Header__install">
              <div>
                <Link
                  target="_blank"
                  to={tokenAdmin ? "/admin" : "/login-admin"}
                  style={{ color: "#fff" }}
                >
                  Kênh người bán
                </Link>
              </div>
              <div>Tải ứng dụng</div>
              <div>Kết nối</div>
              <div className="Header__social">
                <a href="https://facebook.com">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com">
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div className="Header__customer">
              <div className="Header__wrap">
                <FaBell />
                <div>Thông báo</div>
              </div>
              <div className="Header__wrap">
                <MdOutlineContactSupport />
                <div>Hỗ trợ</div>
              </div>
              <div className="Header__wrap">   
                {token ? (
                  <>
                    <UserLogin />       
                  </>
                ) : (
                  <>
                    <Link to="/login" style={{marginRight:"10px"}}>
                      <Button type="primary">Đăng nhập</Button>
                    </Link>
                    <Link to="/register">
                      <Button type="primary">Đăng ký</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <hr/>
          <div className="Header__two">
            <div className="Header__logo">
              <Link to="/">
                <SiShopee />
                <div>Shopee</div>
              </Link>
            </div>
            <div className="Header__bars" onClick={handleClick}>
              {state ? <IoMdClose /> : <FaBars />}
            </div>
          </div>
          <div className="Header__search">
            <div className="Header__input">
              <SearchForm />
            </div>
            <div className="Header__cart">
              {token ? <div className="Header__dot">{data.length}</div> : ""}
              <Link style={{ color: "#fff" }} to="/order">  
                <IoCartOutline />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {state ? <Bars setState={setState} /> : ""}
    </>
  );
}

export default Header;
