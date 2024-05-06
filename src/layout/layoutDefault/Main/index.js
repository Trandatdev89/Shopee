import { Outlet } from "react-router-dom";
import "../base.scss";


function Main() {
  
  return (
    <>
      <div className="Main" style={{backgroundColor:"#fef6f5"}}>
        <div className="container">
          <div className="Main__padding">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
