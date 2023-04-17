import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../Thunk/LoginThunk";

let initState = {
    code: null,
    token: null,
};

let LoginReducer = createSlice({
    name: "login",

    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LoginThunk.pending, (state, action) => {})
            .addCase(LoginThunk.fulfilled, (state, action) => {
                let resPayload = action.payload.data;
                state.code = action.payload.code;

                state.token = resPayload.token;
                localStorage.setItem("AccessToken", resPayload.token);
                localStorage.setItem("avatar", resPayload.avatar);
                localStorage.setItem('permissions' , JSON.stringify(resPayload.permissions))
            })
            .addCase(LoginThunk.rejected, (state, action) => {
                state.code = action.payload.code;
                localStorage.setItem("AccessToken", "");
            });
    },
});

export default LoginReducer.reducer;

// export { }=LoginReducer.actions
