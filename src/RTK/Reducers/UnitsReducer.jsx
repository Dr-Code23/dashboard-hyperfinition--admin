import { createSlice } from "@reduxjs/toolkit";
import { AddUnitThunk } from "../Thunk/AddUnitThunk";

import { AllUnitsThunk } from "../Thunk/AllUnitsThunk";
import { DeleteUnitThunk } from "../Thunk/DeleteUnitThunk";
import { OneUnitThunk } from "../Thunk/OneUnitThunk";
import { UpdateUnitThunk } from "../Thunk/UpdateUnitThunk";
let initState = {
    code: null,
    unitData: [],
    currentPage: 1,
    lastPage: 1,
    nameUnit: "",
};

let UnitsReducer = createSlice({
    name: "unit",

    initialState: initState,
    reducers: {
        closeModal: (state, action) => {
            state.nameUnit = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // =======allBrand===========
            .addCase(AllUnitsThunk.pending, (state, action) => {})
            .addCase(AllUnitsThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.unitData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllUnitsThunk.rejected, (state, action) => {})
            // =========OneUnitThunk=============
            .addCase(OneUnitThunk.fulfilled, (state, action) => {
                state.nameUnit = action.payload.data.name;
                // console.log(action.payload);
            })
            .addCase(OneUnitThunk.rejected, (state, action) => {})
            // =========UpdateAttributeThunk=============
            .addCase(UpdateUnitThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
            })
            .addCase(UpdateUnitThunk.rejected, (state, action) => {})
            // =========AddUnitThunk=============
            .addCase(AddUnitThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
            })
            .addCase(AddUnitThunk.rejected, (state, action) => {})
            // =========DeleteUnitThunk=============
            .addCase(DeleteUnitThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
            })
            .addCase(DeleteUnitThunk.rejected, (state, action) => {});
    },
});

export default UnitsReducer.reducer;

export const { closeModal } = UnitsReducer.actions;
