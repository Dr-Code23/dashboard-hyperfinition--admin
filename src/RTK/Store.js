import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./Reducers/LoginReducer";
import BrandReducer from "./Reducers/BrandReducer";
import AttributeReducer from "./Reducers/AttributeReducer";
import UnitsReducer from "./Reducers/UnitsReducer";
import UserReducer from "./Reducers/UserReducer";
import CategoriesReducer from "./Reducers/CategoriesReducer";
import SubCategoriesReducer from "./Reducers/SubCategoriesReducer";
import SubSubCategoriesReducer from "./Reducers/SubSubCategoriesReducer";
import ContactReducer from "./Reducers/ContactReducer";
import SettingReducer from "./Reducers/SettingReducer";
import ProfileReducer from "./Reducers/ProfileReducer";
import AboutReducer from "./Reducers/AboutReducer";
import RolesReducer from "./Reducers/RolesReducer";
import DashReducer from "./Reducers/DashReducer";
export let Store = configureStore({
    reducer: {
        LoginReducer,
        BrandReducer,
        AttributeReducer,
        UnitsReducer,
        UserReducer,
        CategoriesReducer,
        SubCategoriesReducer,
        SubSubCategoriesReducer,
        ContactReducer,
        SettingReducer,
        ProfileReducer,
        AboutReducer,
        RolesReducer,
        DashReducer,
    },
});
