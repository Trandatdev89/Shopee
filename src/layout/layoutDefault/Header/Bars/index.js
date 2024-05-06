import { Link } from "react-router-dom";
import { getCookie } from "../../../../Components/helper/cookie";
import UserLogin from "../../../../User/UserLogin";


//Component này mục đích hiển thị thanh bars khi người dùng ấn vào nó
function Bars(props) {
  const { setState } = props;  //trạng thái của thanh bars

  const handleClick = () => {
    setState(false);
  };
  const token = getCookie("token");
  return (
    <>
      <ul className="Menu">
        <li onClick={handleClick}>
          <Link to="/login-admin">Đăng nhập Admin</Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/blog">Thông báo</Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/">Hỗ trợ</Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/">Tải ứng dụng</Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/register">Đăng ký</Link>
        </li>
        {token ? (
          <li onClick={handleClick}>
            <Link>
              <UserLogin />
            </Link>
          </li>
        ) : (
          <li onClick={handleClick}>
            <Link to="/login">Đăng nhập</Link>
          </li>        
        )}
      </ul>
    </>
  );
}

export default Bars;
