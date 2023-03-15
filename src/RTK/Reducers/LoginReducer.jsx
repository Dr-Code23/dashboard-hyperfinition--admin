import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../Thunk/LoginThunk";

let initState = {
  code: null,
  token: null,
}


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
        state.code = action.payload.code
        state.token = action.payload.data.token
        localStorage.setItem('AccessToken', action.payload.data.token);

      })
      .addCase(LoginThunk.rejected, (state, action) => {
        state.code = action.payload.code
        localStorage.setItem('AccessToken', '');

      })

  }
})


export default LoginReducer.reducer

// export { }=LoginReducer.actions