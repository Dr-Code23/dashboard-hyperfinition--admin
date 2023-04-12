
import { createSlice } from "@reduxjs/toolkit";

import { DashThunk } from "../Thunk/DashThunk";
let initState = {
  code: null,
  dashData: null,

};

let DashReducer = createSlice({
  name: "dash",

  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // =======contact===========
      .addCase(DashThunk.pending, (state, action) => { })
      .addCase(DashThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.dashData = action.payload.data;
      })
      .addCase(DashThunk.rejected, (state, action) => { });
  },
});

export default DashReducer.reducer;

// export { }=LoginReducer.actions
