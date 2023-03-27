import { createBrowserRouter } from "react-router-dom";
import Attributes from "./Pages/Attributes";
import Brand from "./Pages/Brand";
import Categories from "./Pages/Categories";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import Units from "./Pages/Units";
import UserDetail from "./Pages/UserDetail";
import Users from "./Pages/Users";

export let Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>errorElement</div>,
  },
  {
    path: "/admin",
    element: <Layout />,
    errorElement: <div>errorElement</div>,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "shop",
        element: <Shop />,

      },
      {
        path: "brand",
        element: <Brand />,
      },
      {
        path: "attributes",
        element: <Attributes />,
      },
      {
        path: "units",
        element: <Units />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/detail/:id",
        element: <UserDetail />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        // path: "admin",
        // element: <Admin />,
        // loader: async (e) => {
        //   if (localStorage.AccessToken) {
        //   }
        //   return e
        // },
      },
    ],
  },


]);
