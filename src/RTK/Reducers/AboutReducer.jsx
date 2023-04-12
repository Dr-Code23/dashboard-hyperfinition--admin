import { createSlice } from "@reduxjs/toolkit";
import { AddUserThunk } from "../Thunk/AddUserThunk";
import { AllUsersThunk } from "../Thunk/AllUsersThunk";
import { OneUserThunk } from "../Thunk/OneUserThunk";
import { RolesDataThunk } from "../Thunk/RolesDataThunk";
import { UpdateUserThunk } from "../Thunk/UpdateUserThunk";
import { DeleteUserThunk } from "../Thunk/DeleteUserThunk";
import { OneAboutThunk } from "../Thunk/OneAboutThunk";
import { UpdateAboutThunk } from "../Thunk/UpdateAboutThunk";

let initState = {
    code: null,
    oneImg: "",
    oneAbout: "",
    oneName: {},
    oneDesc: {},
    nameError: null,
    descError: null,
    nameError_en: null,
    nameError_ar: null,
    nameError_fr: null,
    descError_en: null,
    descError_ar: null,
    descError_fr: null,
    avatarError: null,
};

let AboutReducer = createSlice({
    name: "about",

    initialState: initState,
    reducers: {
        closeAbout: (state, action) => {
            state.oneAbout = "";
            state.oneImg = null;
            state.oneName = {};
            state.oneDesc = {};
        },
        closeError: (state, action) => {
            state.nameError_en = null;
            state.nameError_ar = null;
            state.nameError_fr = null;
            state.descError_en = null;
            state.descError_ar = null;
            state.descError_fr = null;
            state.avatarError = null;
        },
    },
    extraReducers: (builder) => {
        builder

            // =======OneUserThunk===========
            .addCase(OneAboutThunk.fulfilled, (state, action) => {
                state.oneAbout = action.payload?.data;
                state.oneImg = action.payload?.data.image;
                state.oneName = action.payload?.data.name;
                state.oneDesc = action.payload?.data.oneDesc;
            })
            .addCase(OneAboutThunk.rejected, (state, action) => { })
            // =======UpdateAboutThunk===========
            .addCase(UpdateAboutThunk.fulfilled, (state, action) => { })
            .addCase(UpdateAboutThunk.rejected, (state, action) => {
                state.nameError_en = action.payload?.data?.["name.en"];
                state.nameError_ar = action.payload?.data?.["name.ar"];
                state.nameError_fr = action.payload?.data?.["name.fr"];
                state.descError_en = action.payload?.data?.["description.en"];
                state.descError_ar = action.payload?.data?.["description.ar"];
                state.descError_fr = action.payload?.data?.["description.fr"];
                state.avatarError = action.payload?.data?.image;
            });
    },
});

export default AboutReducer.reducer;

export let { closeAbout, closeError } = AboutReducer.actions;
