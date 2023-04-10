import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./Reducers/LoginReducer";
import BrandReducer from "./Reducers/BrandReducer";
import AttributeReducer from "./Reducers/AttributeReducer";
import UnitsReducer from "./Reducers/UnitsReducer";
import UserReducer from "./Reducers/UserReducer";
import CategoriesReducer from "./Reducers/CategoriesReducer";
import SubCategoriesReducer from "./Reducers/SubCategoriesReducer";
import SubSubCategoriesReducer from "./Reducers/SubSubCategoriesReducer";
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
    },
});
