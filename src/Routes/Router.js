import { createBrowserRouter } from "react-router-dom";
import TestBox from "../HooK/TestBox";
import {
    AboutBox,
    AdsAEditBox,
    AdsAddBox,
    AdsBox,
    ComponyExpensesAdd,
    ComponyExpensesView,
    ContactBox,
    GeneralExpenses,
    GeneralExpensesAdd,
    GeneralExpensesEdit,
    ProductEdit,
    ProductNew,
    ProfileBox,
    ProjectAdd,
    ProjectPayment,
    ProjectPaymentAdd,
    ProjectPaymentEdit,
    ProjectPaymentView,
    ProjectView,
    RolesBox,
    RolesBoxAdd,
    RolesBoxEdit,
    ServicesAdd,
    ServicesBox,
    ServicesEdit,
    SettingsBox,
    SubCategoriesBox,
    SubCategoriesEdit,
    SubSubCategoriesBox,
    SubSubCategoriesEdit,
    UserAddBox,
} from "../components";
import CategoriesEdit from "../components/CategoriesEdit/CategoriesEdit";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import Attributes from "./Pages/Attributes";
import Brand from "./Pages/Brand";
import Categories from "./Pages/Categories";
import Compony from "./Pages/Compony";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import PrintBox from "./Pages/Print";
import Product from "./Pages/Product";
import Project from "./Pages/Project";
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
                path: "brand",
                element: <TestBox data={'brand_management'}><Brand /></TestBox>,
            },
            {
                path: "attributes",
                element: <TestBox data={'attribute_management'}>
                    <Attributes />
                </TestBox>,
            },
            {
                path: "units",
                element: <TestBox data={'unit_management'}><Units /></TestBox>,

            },
            {
                path: "users",
                element:
                    <TestBox data={'user_management'}><Users /></TestBox>,
            },
            {
                path: "users/detail/:user_id",
                element: <TestBox data={'user_management'}><UserDetail /></TestBox>,
            },
            {
                path: "users/add/:user_add",
                element: <TestBox data={'user_management'}><UserAddBox /></TestBox>,
            },
            {
                path: "categories",
                element: <TestBox data={'category_management'}><Categories /></TestBox>,
            },

            {
                path: "categories/edit/:editCategories",
                element: <TestBox data={'category_management'}><CategoriesEdit /></TestBox>,
            },

            {
                path: "categories/sub",
                element: <TestBox data={'category_management'}><SubCategoriesBox /></TestBox>,
            },
            {
                path: "categories/sub/edit/:idMainCategories/:editSub",
                element: <TestBox data={'category_management'}><SubCategoriesEdit /></TestBox>,
            },
            {
                path: "categories/sub_sub",
                element: <TestBox data={'category_management'}><SubSubCategoriesBox /></TestBox>,
            },
            {
                path: "categories/sub_sub/edit/:editSub/:SubSub",
                element: <TestBox data={'category_management'}><SubSubCategoriesEdit /></TestBox>,
            },
            {
                path: "product",
                element: <TestBox data={'product_management'}><Product /></TestBox>,
            },
            {
                path: "product/add",
                element: <TestBox data={'product_management'}><ProductNew /></TestBox>,
            },
            {
                path: "product/edit/:productEdit",
                element: <TestBox data={'product_management'}><ProductEdit /></TestBox>,
            },
            {
                path: "services",
                element: <TestBox data={'service_management'}><ServicesBox /></TestBox>,
            },
            {
                path: "services/add",
                element: <TestBox data={'service_management'}><ServicesAdd /></TestBox>,
            },
            {
                path: "services/edit/:serviceEdit",
                element: <TestBox data={'service_management'}><ServicesEdit /></TestBox>,
            },
            {
                path: "generalExpenses",
                element: <TestBox data={'general_expenses_management'}><GeneralExpenses /></TestBox>,
            },
            {
                path: "generalExpenses/add",
                element: <TestBox data={'general_expenses_management'}><GeneralExpensesAdd /></TestBox>,
            },
            {
                path: "generalExpenses/edit/:GeneralExpensesEdit",
                element: <TestBox data={'general_expenses_management'}><GeneralExpensesEdit /></TestBox>,
            },
            {
                path: "project",
                element: <TestBox data={'project_management'}><Project /></TestBox>,
            },
            {
                path: "project/add/",
                element: <TestBox data={'project_management'}><ProjectAdd /></TestBox>,
            },
            {
                path: "project/view/:projectView",
                element: <TestBox data={'project_management'}><ProjectView /></TestBox>,
            },
            {
                path: "projectPayment",
                element: <TestBox data={'project_payment_management'}><ProjectPayment /></TestBox>,
            },
            {
                path: "projectPayment/view/:paymentView",
                element: <TestBox data={'project_payment_management'}><ProjectPaymentView /></TestBox>,
            },
            {
                path: "projectPayment/add",
                element: <TestBox data={'project_payment_management'}><ProjectPaymentAdd /></TestBox>,
            },
            {
                path: "projectPayment/edit/:projectPaymentEdit",
                element: <TestBox data={'project_payment_management'}><ProjectPaymentEdit /></TestBox>,
            },
            {
                path: "projectExpense",
                element: <TestBox data={'project_expenses_management'}><Compony /></TestBox>,
            },
            {
                path: "projectExpense/add",
                element: <TestBox data={'project_expenses_management'}><ComponyExpensesAdd /></TestBox>,
            },
            {
                path: "projectExpense/view/:ComponyExpensesView",
                element: <TestBox data={'project_expenses_management'}><ComponyExpensesView /></TestBox>,
            },
            {
                path: "profile",
                element: <ProfileBox />,
            },
            {
                path: "contact",
                element: <TestBox data={'contact_us_management'}><ContactBox /></TestBox>,
            },
            {
                path: "about",
                element: <TestBox data={'about_us_management'}><AboutBox /></TestBox>,
            },
            {
                path: "roles",
                element: <TestBox data={'role_management'}><RolesBox /></TestBox>,
            },
            {
                path: "roles/add/:RolesBoxAdd",
                element: <TestBox data={'role_management'}><RolesBoxAdd /></TestBox>,
            },
            {
                path: "roles/edit/:RolesBoxEdit",
                element: <TestBox data={'role_management'}><RolesBoxEdit /></TestBox>,
            },
            {
                path: "settings",
                element: <TestBox data={'settings_management'}><SettingsBox /></TestBox>,
            },
            {
                path: "ads",
                element: <TestBox data={'ad_management'}><AdsBox /></TestBox>,
            },
            {
                path: "ads/add",
                element: <TestBox data={'ad_management'}><AdsAddBox /></TestBox>,
            },
            {
                path: "ads/edit/:editAds",
                element: <TestBox data={'ad_management'}><AdsAEditBox /></TestBox>,
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
    {
        path: "print/:printId",
        element: <PrintBox />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
