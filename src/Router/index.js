import LayoutDefault from "../layout/layoutDefault";
import Blog from "../page/Blog";
import Home from "../page/Home";
import Login from "../page/Login/index";
import ProductDetails from "../page/Products/ProductDetails";
import Search from "../page/Search";
import Register from "../page/Register/index";
import Logout from "../page/Logout";
import PrivateUser from "../Components/PrivateRouter";
import PrivateAdmin from "../Components/PrivateRouter/PrivateAdmin";
import InfoUser from "../User/infoUser";
import Order from "../User/Order";
import Error from "../page/Error/Error404";
import LayoutAdmin from "../layout/layoutAdmin";
import Admin from "../Admin";
import LoginAdmin from "../Admin/Login";
import RegisterAdmin from "../Admin/Register";
import InfoCompany from "../Admin/infoCompany";
import LogoutAdmin from "../Admin/Logout";
import ManagerProduct from "../Admin/Manager/ManagerProduct";
import CreateProduct from "../Admin/Manager/createProduct";
import ManageOrder from "../Admin/Manager/ManagerOrder";
import PayDetails from "../User/Pay/PayDetails";
import BuyFinish from "../User/BuyFinish";
import InfoShop from "../page/infoCompany";
import TranformFinish from "../User/TranformFinish";

export const route = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Error />,
      },
      {
        path:"/info-shop/:id",
        element:<InfoShop/>
      },
      {
        element: <PrivateUser />,
        children: [
          {
            path: "/logout",
            element: <Logout />,
          },
          {
            path: "/infoUser",
            element: <InfoUser />,
          },
          {
            path: "/order",
            element: <Order />,
          },
          {
            path: "/order-finish",
            element: <BuyFinish />,
          },
          {
            path: "/tranform-finish/:id",
            element: <TranformFinish />,
          },
          {
            path: "/pay-details/:dataOrder",
            element: <PayDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        path: "/login-admin",
        element: <LoginAdmin />,
      },
      {
        path: "/register-admin",
        element: <RegisterAdmin/>,
      },
      {
        element: <PrivateAdmin />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },
          {
            path: "/infocompany",
            element: <InfoCompany />,
          }
          ,
          {
            path:"/logout-admin",
            element:<LogoutAdmin/>
          }
          ,
          {
            path:"/manage-product",
            element:<ManagerProduct/>
          },
          {
            path:"/create-product",
            element:<CreateProduct/>
          },
          {
            path:"/manage-order",
            element:<ManageOrder/>
          }
        ],
      },
    ],
  },
];
