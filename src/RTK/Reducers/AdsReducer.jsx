import { createSlice } from "@reduxjs/toolkit";
import { AddUserThunk } from "../Thunk/AddUserThunk";
import { AllUsersThunk } from "../Thunk/AllUsersThunk";
import { OneUserThunk } from "../Thunk/OneUserThunk";
import { RolesDataThunk } from "../Thunk/RolesDataThunk";
import { UpdateUserThunk } from "../Thunk/UpdateUserThunk";
import { DeleteUserThunk } from "../Thunk/DeleteUserThunk";
import { AllAdsThunk } from "../Thunk/AllAdsThunk";
import { AddAdsThunk } from "../Thunk/AddAdsThunk";
import { OneAdsThunk } from "../Thunk/OneAdsThunk";
import { UpdateAdsThunk } from "../Thunk/UpdateAdsThunk";
import { DeleteAdsThunk } from "../Thunk/DeleteAdsThunk";

let initState = {
    code: null,
    adsData: [],
    currentPage: 1,
    lastPage: 1,
    oneImg: "",
    oneName: "",
    oneDesc: "",
    oneAds: "",
    oneDisc: "",
    roleData: [],
    avatarError: null,
    discountError: null,
    nameError_en: null,
    nameError_ar: null,
    nameError_fr: null,
    descError_en: null,
    descError_ar: null,
    descError_fr: null,
};

let AdsReducer = createSlice({
    name: "ads",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            state.nameError_en = null;
            state.nameError_ar = null;
            state.nameError_fr = null;
            state.descError_en = null;
            state.descError_ar = null;
            state.descError_fr = null;
            state.avatarError = null;
            state.discountError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======ads===========
            .addCase(AllAdsThunk.pending, (state, action) => {})
            .addCase(AllAdsThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.adsData = action.payload?.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllAdsThunk.rejected, (state, action) => {})

            // =======AddAdsThunk===========
            .addCase(AddAdsThunk.fulfilled, (state, action) => {})
            .addCase(AddAdsThunk.rejected, (state, action) => {
                state.nameError_en = action.payload?.data?.["title.en"];
                state.nameError_ar = action.payload?.data?.["title.ar"];
                state.nameError_fr = action.payload?.data?.["title.fr"];
                state.descError_en = action.payload?.data?.["description.en"];
                state.descError_ar = action.payload?.data?.["description.ar"];
                state.descError_fr = action.payload?.data?.["description.fr"];
                state.avatarError = action.payload?.data?.image;
                state.discountError = action.payload?.data?.discount;
            })
            // =======UpdateAdsThunk===========
            .addCase(UpdateAdsThunk.fulfilled, (state, action) => {})
            .addCase(UpdateAdsThunk.rejected, (state, action) => {
                state.nameError_en = action.payload?.data?.["title.en"];
                state.nameError_ar = action.payload?.data?.["title.ar"];
                state.nameError_fr = action.payload?.data?.["title.fr"];
                state.descError_en = action.payload?.data?.["description.en"];
                state.descError_ar = action.payload?.data?.["description.ar"];
                state.descError_fr = action.payload?.data?.["description.fr"];
                state.avatarError = action.payload?.data?.image;
                state.discountError = action.payload?.data?.discount;
            })
            // =======OneAdsThunk===========
            .addCase(OneAdsThunk.fulfilled, (state, action) => {
                state.oneAds = action.payload?.data;
                state.oneImg = action.payload?.data.image;
                state.oneName = action.payload?.data.name;
                state.oneDesc = action.payload?.data.oneDesc;
                state.oneDisc = action.payload?.data.oneDesc;
            })

            // // =======DeleteUserThunk===========
            .addCase(DeleteAdsThunk.fulfilled, (state, action) => {})
            .addCase(DeleteAdsThunk.rejected, (state, action) => {
                // console.log(action.payload);
            });
    },
});

export default AdsReducer.reducer;

export let { closeModal, closeError } = AdsReducer.actions;
