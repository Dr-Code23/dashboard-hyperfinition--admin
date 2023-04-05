import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./Reducers/LoginReducer";
import BrandReducer from "./Reducers/BrandReducer";
export let Store = configureStore({
    reducer: {
        LoginReducer,
        BrandReducer,
    },
});
