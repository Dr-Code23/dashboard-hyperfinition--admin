import { createSlice } from "@reduxjs/toolkit";
import { AllUsersThunk } from "../Thunk/AllUsersThunk";
import { OneUserThunk } from "../Thunk/OneUserThunk";

let initState = {
    code: null,
    userData: [],
    currentPage: 1,
    lastPage: 1,
    oneUser: null,
    oneImg: "",
    oneRole: "",
    oneName: "",
    oneEmail: "",
};

let UserReducer = createSlice({
    name: "user",

    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // =======allBrand===========
            .addCase(AllUsersThunk.pending, (state, action) => {})
            .addCase(AllUsersThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.userData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllUsersThunk.rejected, (state, action) => {})
            // =======OneUserThunk===========
            .addCase(OneUserThunk.fulfilled, (state, action) => {
                state.oneUser = action.payload.data;
                state.oneImg = action.payload.data.avatar;
                state.oneRole = action.payload.data.role_name;
                state.oneName = action.payload.data.name;
                state.oneEmail = action.payload.data.email;
            })
            .addCase(OneUserThunk.rejected, (state, action) => {});
    },
});

export default UserReducer.reducer;

// export { }=LoginReducer.actions
