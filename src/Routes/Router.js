import { createBrowserRouter } from "react-router-dom";
import { ComponyExpenses, ProductEdit, ProductNew, ProfileBox, ProjectAdd, ProjectPayment, ProjectPaymentAdd, ProjectPaymentEdit, ProjectView, ServicesAdd, ServicesBox, ServicesEdit, SubCategoriesBox, SubCategoriesEdit, SubSubCategoriesBox } from "../components";
import CategoriesEdit from "../components/CategoriesEdit/CategoriesEdit";
import Attributes from "./Pages/Attributes";
import Brand from "./Pages/Brand";
import Categories from "./Pages/Categories";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Project from "./Pages/Project";
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
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/edit/:editCategories",
        element: <CategoriesEdit />,
      },

      {
        path: "categories/sub",
        element: <SubCategoriesBox />,
      },
      {
        path: "categories/sub/edit/:editSub",
        element: <SubCategoriesEdit />,
      },
      {
        path: "categories/sub_sub",
        element: <SubSubCategoriesBox />,
      },
      {
        path: "categories/sub_sub/edit/:editSub",
        element: <SubCategoriesEdit />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/add/:productAdd",
        element: <ProductNew />,
      },
      {
        path: "product/edit/:productEdit",
        element: <ProductEdit />,
      },
      {
        path: "services",
        element: <ServicesBox />,
      },
      {
        path: "services/add/:serviceAdd",
        element: <ServicesAdd />,
      },
      {
        path: "services/edit/:serviceEdit",
        element: <ServicesEdit />,
      },
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "project/add/:projectAdd",
        element: <ProjectAdd />,
      },
      {
        path: "project/view/:projectView",
        element: <ProjectView />,
      },
      {
        path: "projectPayment",
        element: <ProjectPayment />,
      },
      {
        path: "projectPayment/add/:projectPaymentAdd",
        element: <ProjectPaymentAdd />,
      },
      {
        path: "projectPayment/edit/:projectPaymentEdit",
        element: <ProjectPaymentEdit />,
      },
      {
        path: "componyExpenses",
        element: <ComponyExpenses />,
      },
      {
        path: "profile",
        element: <ProfileBox />,
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
