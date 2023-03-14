import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../Thunk/LoginThunk";

let initState = {}


let LoginReducer = createSlice({

  name: 'login',

  initialState: initState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state, action) => {


      })
      .addCase(LoginThunk.fulfilled, (state, action) => {


      })
      .addCase(LoginThunk.rejected, (state, action) => {


      })

  }
})


export default LoginReducer.reducer

// export { }=LoginReducer.actions