import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { reloadHeader } from "../../Actions";
import { deleteCookie } from "../../Components/helper/cookie";

function LogoutAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kk=useSelector(state=>state.sortRender);
  const deleteToken = deleteCookie("tokenAdmin");
  const reload=useSelector(state=>state.sortRender);
 
  useEffect(() => {
    const fetchAPI=async()=>{
      dispatch(reloadHeader(!kk));
      navigate("/login-admin");
    }
    fetchAPI();
  }, [reload]);

  return <></>;
}

export default LogoutAdmin;
