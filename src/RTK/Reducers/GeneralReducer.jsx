import { createSlice } from "@reduxjs/toolkit";
import { AllGeneralThunk } from "../Thunk/AllGeneralThunk";
import { AddGeneralThunk } from "../Thunk/AddGeneralThunk";
import { OneGeneralThunk } from "../Thunk/OneGeneralThunk";
import { UpdateGeneralThunk } from "../Thunk/UpdateGeneralThunk";
import { DeleteGeneralThunk } from "../Thunk/DeleteGeneralThunk";

let initState = {
    code: null,
    currentPage: 1,
    lastPage: 1,
    generalData: [],
    oneDesc: "",
    oneGeneral: "",
    onePrice: "",
    roleData: [],

    descError: null,
    priceError: null,
};

let GeneralReducer = createSlice({
    name: "general",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            state.descError = null;
            state.priceError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======ads===========
            .addCase(AllGeneralThunk.pending, (state, action) => {})
            .addCase(AllGeneralThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.generalData = action.payload?.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllGeneralThunk.rejected, (state, action) => {})

            // =======AddAdsThunk===========
            .addCase(AddGeneralThunk.fulfilled, (state, action) => {})
            .addCase(AddGeneralThunk.rejected, (state, action) => {
                state.descError = action.payload?.data?.reason;
                state.priceError = action.payload?.data?.price;
            })
            // =======UpdateGeneralThunk===========
            .addCase(UpdateGeneralThunk.fulfilled, (state, action) => {})
            .addCase(UpdateGeneralThunk.rejected, (state, action) => {
                state.descError = action.payload?.data?.reason;
                state.priceError = action.payload?.data?.price;
            })

            // // =======OneAdsThunk===========
            .addCase(OneGeneralThunk.fulfilled, (state, action) => {
                state.oneGeneral = action.payload?.data;
                state.onePrice = action.payload?.data.price;
                state.oneDesc = action.payload?.data.reason;
            })

            // // =======DeleteUserThunk===========
            .addCase(DeleteGeneralThunk.fulfilled, (state, action) => {})
            .addCase(DeleteGeneralThunk.rejected, (state, action) => {
                // console.log(action.payload);
            });
    },
});

export default GeneralReducer.reducer;

export let { closeModal, closeError } = GeneralReducer.actions;
