import { useNavigate } from "react-router-dom";
import './index.scss';
function GoBack(){
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate(-1);
    }
    return(
        <>
          <button className="goback" onClick={handleClick}>Quay lại</button>
        </>
    )
}

export default GoBack;