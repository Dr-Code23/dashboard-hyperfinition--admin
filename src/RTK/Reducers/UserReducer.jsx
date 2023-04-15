import { createSlice } from "@reduxjs/toolkit";
import { AddUserThunk } from "../Thunk/AddUserThunk";
import { AllUsersThunk } from "../Thunk/AllUsersThunk";
import { OneUserThunk } from "../Thunk/OneUserThunk";
import { RolesDataThunk } from "../Thunk/RolesDataThunk";
import { UpdateUserThunk } from "../Thunk/UpdateUserThunk";
import { DeleteUserThunk } from "../Thunk/DeleteUserThunk";

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
    roleData: [],
    nameError: null,
    emailError: null,
    passwordError: null,
    role_idError: null,
    avatarError: null,
};

let UserReducer = createSlice({
    name: "user",

    initialState: initState,
    reducers: {
        closeModal: (state, action) => {
            state.oneUser = null;
            state.oneImg = "";
            state.oneRole = "";
            state.oneName = "";
            state.oneEmail = "";
            state.userData = [];


        },
        closeError: (state, action) => {
            state.nameError = null;
            state.emailError = null;
            state.passwordError = null;
            state.role_idError = null;
            state.avatarError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======allBrand===========
            .addCase(AllUsersThunk.pending, (state, action) => { })
            .addCase(AllUsersThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.userData = action.payload?.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllUsersThunk.rejected, (state, action) => { })
            // =======OneUserThunk===========
            .addCase(OneUserThunk.fulfilled, (state, action) => {
                state.oneUser = action.payload?.data;
                state.oneImg = action.payload?.data.avatar;
                state.oneRole = action.payload?.data.role_id;
                state.oneName = action.payload?.data.name;
                state.oneEmail = action.payload?.data.email;
            })
            .addCase(OneUserThunk.rejected, (state, action) => { })
            // =======RolesDataThunk===========
            .addCase(RolesDataThunk.fulfilled, (state, action) => {
                state.roleData = action.payload?.data;
            })
            .addCase(RolesDataThunk.rejected, (state, action) => { })
            // =======UpdateUserThunk===========
            .addCase(UpdateUserThunk.fulfilled, (state, action) => { })
            .addCase(UpdateUserThunk.rejected, (state, action) => {
                state.nameError = action.payload?.data?.name;
                state.emailError = action.payload?.data?.email;
                state.passwordError = action.payload?.data?.password;
                state.role_idError = action.payload?.data?.role_id;
                state.avatarError = action.payload?.data?.avatar;
            })
            // =======AddUserThunk===========
            .addCase(AddUserThunk.fulfilled, (state, action) => { })
            .addCase(AddUserThunk.rejected, (state, action) => {
                // console.log(action.payload);
                state.nameError = action.payload?.data?.name;
                state.emailError = action.payload?.data?.email;
                state.passwordError = action.payload?.data?.password;
                state.role_idError = action.payload?.data?.role_id;
                state.avatarError = action.payload?.data?.avatar;
            })
            // =======DeleteUserThunk===========
            .addCase(DeleteUserThunk.fulfilled, (state, action) => { })
            .addCase(DeleteUserThunk.rejected, (state, action) => {
                // console.log(action.payload);
            });
    },
});

export default UserReducer.reducer;

export let { closeModal, closeError } = UserReducer.actions;
