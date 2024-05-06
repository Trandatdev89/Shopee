import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../Components/helper/cookie";
import { useEffect } from "react";
import { reloadHeader } from "../../Actions";



function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteToken = deleteCookie("token");  //xóa token là sẽ đăng xuất
  const reload=useSelector(state=>state.sortRender);
 
  useEffect(() => {
    const fetchAPI=async()=>{
      dispatch(reloadHeader(false));
      navigate("/login");
    }
    fetchAPI();
  }, [reload]);

  return <></>;
}

export default Logout;
