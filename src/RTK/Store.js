import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./Reducers/LoginReducer";

export let Store = configureStore({
  reducer: {
    LoginReducer


  }
})