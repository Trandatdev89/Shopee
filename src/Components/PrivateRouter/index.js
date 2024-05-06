import { Outlet } from "react-router-dom";
import { getCookie } from "../helper/cookie";

function PrivateUser(){
    const token=getCookie("token");
    return(
        <>
           {token?(<Outlet/>):(<h2>Bạn chưa đăng nhập.Vui lòng đăng nhập</h2>)}
        </>
    )
}

export default PrivateUser;