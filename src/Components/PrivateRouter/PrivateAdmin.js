import { Outlet } from "react-router-dom";
import { getCookie } from "../helper/cookie";

function PrivateAdmin(){
    const tokenAdmin=getCookie("tokenAdmin");
    return(
        <>
           {tokenAdmin?(<Outlet/>):(<h2>Bạn chưa đăng nhập.Vui lòng đăng nhập</h2>)}
        </>
    )
}

export default PrivateAdmin;