import { createSlice } from "@reduxjs/toolkit";
import { OneProfileThunk } from "../Thunk/OneProfileThunk";
import { UpdateProfileThunk } from "../Thunk/UpdateProfileThunk";

let initState = {
    name: "",
    email: "",
    role_id: "",
    role_name: "",
    avatar: "",
    userData: {},
    nameError: null,
    emailError: null,
    passwordError: null,
    avatarError: null,
};

let ProfileReducer = createSlice({
    name: "profile",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            state.nameError = null;
            state.emailError = null;
            state.passwordError = null;
            state.avatarError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(OneProfileThunk.pending, (state, action) => {})
            .addCase(OneProfileThunk.fulfilled, (state, action) => {
                state.name = action.payload.data.name;
                state.userData = action.payload.data;
                state.email = action.payload.data.email;
                state.role_id = action.payload.data.role_id;
                state.avatar = action.payload.data.avatar;
                state.role_name = action.payload.data.role_name;
            })
            // =======UpdateUserThunk===========
            .addCase(UpdateProfileThunk.fulfilled, (state, action) => {
                localStorage.setItem("avatar", action.payload.data.avatar);
                // //console.log(action.payload.data.avatar);
                state.avatar = action.payload.data.avatar;
            })
            .addCase(UpdateProfileThunk.rejected, (state, action) => {
                state.nameError = action.payload?.data?.name;
                state.emailError = action.payload?.data?.email;
                state.passwordError = action.payload?.data?.password;
                state.avatarError = action.payload?.data?.avatar;
            });
    },
});

export default ProfileReducer.reducer;

export let { closeError } = ProfileReducer.actions;
