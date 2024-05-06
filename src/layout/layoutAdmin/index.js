import { Drawer, Layout } from "antd";
import "./Footer/index";
import Footer from "./Footer/index";
import "./style.scss";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import HeaderAdmin from "./Header";
import MenuSider from "./MenuSider";
import { Outlet } from "react-router-dom";
import { getCookie } from "../../Components/helper/cookie";
import { useSelector } from "react-redux";
import { useState } from "react";

function LayoutAdmin() {
  const tokenAdmin = getCookie("tokenAdmin");
  const reload = useSelector((state) => state.sortRender);
  const [open, setOpen] = useState(false);
  const onClose=()=>{
    setOpen(false);
  }
  return (
    <>
      {tokenAdmin ? (
        <Layout>
          <HeaderAdmin open={open} setOpen={setOpen}/>
          <Layout>
            <Sider theme="light" width="250px" className="sider">
              <MenuSider />
            </Sider>
            <Drawer width={"280px"} title="Menu" open={open} onClose={onClose} className="drawer" placement="left">
               <MenuSider />
            </Drawer>
            <Content>
              <div className="container">
                <div style={{ minHeight: "100vh", padding: "50px 0" }}>
                  <Outlet />
                </div>
              </div>
            </Content>
          </Layout>
          <Footer>
            <Footer />
          </Footer>
        </Layout>
      ) : (
        <>
          <Layout>
            <HeaderAdmin />
            <Content>
              {" "}
              <div className="container">
                <div style={{ minHeight: "100vh", padding: "50px 0" }}>
                  <Outlet />
                </div>
              </div>
            </Content>
            <Footer>
              <Footer />
            </Footer>
          </Layout>
        </>
      )}
    </>
  );
}

export default LayoutAdmin;
