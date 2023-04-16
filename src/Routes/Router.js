import { createBrowserRouter } from "react-router-dom";
import {
    SettingsBox,
    AboutBox,
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
    ProjectView,
    RolesBox,
    RolesBoxAdd,
    RolesBoxEdit,
    ServicesAdd,
    ServicesBox,
    ServicesEdit,
    SubCategoriesBox,
    SubCategoriesEdit,
    SubSubCategoriesBox,
    UserAddBox,
    SubSubCategoriesEdit,
    AdsBox,
    AdsAddBox,
    AdsAEditBox,
    ProjectPaymentView,
} from "../components";
import CategoriesEdit from "../components/CategoriesEdit/CategoriesEdit";
import Attributes from "./Pages/Attributes";
import Brand from "./Pages/Brand";
import Categories from "./Pages/Categories";
import Company from "./Pages/Company";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Project from "./Pages/Project";
import Units from "./Pages/Units";
import UserDetail from "./Pages/UserDetail";
import Users from "./Pages/Users";
import hasPermission from '../config/functions'

export let Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <div>This Page Is Not Found</div>,
    },
    {
        path: "/admin",
        element: <Layout />,
        errorElement: <div>This Page Is Not Found</div>,
        children: [
            { index: true, element: <Dashboard /> },

            {
                path: hasPermission('brand_management') ? "brand" : '',
                element: <Brand />,
            },
            {
                path: hasPermission('attribute_management') ? "attributes" : '',
                element: <Attributes />,
            },
            {
                path: hasPermission('unit_management') ? "units" : '',
                element: <Units />,
            },
            {
                path: hasPermission('user_management') ? "users" : '',
                element: <Users />,
            },
            {
                path: hasPermission('user_management') ? "users/detail/:user_id" : '',
                element: <UserDetail />,
            },
            {
                path: hasPermission('user_management') ? "users/add/:user_add" : '',
                element: <UserAddBox />,
            },
            {
                path: hasPermission('category_management') ? "categories" : '',
                element: <Categories />,
            },

            {
                path:  hasPermission('category_management') ? "categories/edit/:editCategories" : '',
                element: <CategoriesEdit />,
            },

            {
                path:  hasPermission('category_management') ? "categories/sub" : '',
                element: <SubCategoriesBox />,
            },
            {
                path:  hasPermission('category_management') ? "categories/sub/edit/:idMainCategories/:editSub" : '',
                element: <SubCategoriesEdit />,
            },
            {
                path:  hasPermission('category_management') ? "categories/sub_sub" : '',
                element: <SubSubCategoriesBox />,
            },
            {
                path:  hasPermission('category_management') ? "categories/sub_sub/edit/:editSub/:SubSub" : '',
                element: <SubSubCategoriesEdit />,
            },
            {
                path: hasPermission('product_management') ? "product" : '',
                element: <Product />,
            },
            {
                path: hasPermission('product_management') ? "product/add" : '',
                element: <ProductNew />,
            },
            {
                path: hasPermission('product_management') ? "product/edit/:productEdit" : '',
                element: <ProductEdit />,
            },
            {
                path: hasPermission('service_management') ? "services" : '',
                element: <ServicesBox />,
            },
            {
                path: hasPermission('service_management') ? "services/add" : '',
                element: <ServicesAdd />,
            },
            {
                path: hasPermission('service_management') ? "services/edit/:serviceEdit" : '',
                element: <ServicesEdit />,
            },
            {
                path: hasPermission('general_expenses_management') ? "generalExpenses" : '',
                element: <GeneralExpenses />,
            },
            {
                path: hasPermission('general_expenses_management') ? "generalExpenses/add" : '',
                element: <GeneralExpensesAdd />,
            },
            {
                path: hasPermission('general_expenses_management') ? "generalExpenses/edit/:GeneralExpensesEdit" : '',
                element: <GeneralExpensesEdit />,
            },
            {
                path: hasPermission('project_management') ? "project" : '',
                element: <Project />,
            },
            {
                path: hasPermission('project_management') ? "project/add/" : '',
                element: <ProjectAdd />,
            },
            {
                path: hasPermission('project_management') ? "project/view/:projectView" : '',
                element: <ProjectView />,
            },
            {
                path: hasPermission('project_management') ? "projectPayment" : '',
                element: <ProjectPayment />,
            },
            {
                path: hasPermission('project_payment_management') ? "projectPayment/view/:paymentView" : '',
                element: <ProjectPaymentView />,
            },
            {
                path: hasPermission('project_payment_management') ? "projectPayment/add" : '',
                element: <ProjectPaymentAdd />,
            },
            {
                path: hasPermission('project_payment_management') ? "projectPayment/edit/:projectPaymentEdit" : '',
                element: <ProjectPaymentEdit />,
            },
            {
                path: hasPermission('project_expenses_management') ? "projectExpense" : '',
                element: <Company />,
            },
            {
                path: hasPermission('project_expenses_management') ? "projectExpense/add" : '',
                element: <ComponyExpensesAdd />,
            },
            {
                path: hasPermission('project_expenses_management') ? "projectExpense/view/:ComponyExpensesView" : '',
                element: <ComponyExpensesView />,
            },
            {
                path: "profile",
                element: <ProfileBox />,
            },
            {
                path: hasPermission('contact_us_management') ? "contact" : '',
                element: <ContactBox />,
            },
            {
                path:  hasPermission('about_us_management') ? "about" : '',
                element: <AboutBox />,
            },
            {
                path: hasPermission('role_management') ? "roles" : '',
                element: <RolesBox />,
            },
            {
                path: hasPermission('role_management') ? "roles/add/:RolesBoxAdd" : '',
                element: <RolesBoxAdd />,
            },
            {
                path: hasPermission('role_management') ? "roles/edit/:RolesBoxEdit" : '',
                element: <RolesBoxEdit />,
            },
            {
                path: hasPermission('settings_management') ? "settings" : '',
                element: <SettingsBox />,
            },
            {
                path: hasPermission('ad_management') ? "ads" : '',
                element: <AdsBox />,
            },
            {
                path: hasPermission('ad_management') ? "ads/add" : '',
                element: <AdsAddBox />,
            },
            {
                path: hasPermission('ad_management') ? "ads/edit/:editAds" : '',
                element: <AdsAEditBox />,
            },
        ],
    },
]);
