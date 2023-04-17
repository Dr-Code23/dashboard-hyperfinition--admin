import { createSlice } from "@reduxjs/toolkit";
import { AddAttributeThunk } from "../Thunk/AddAttributeThunk";
import { AddBrandThunk } from "../Thunk/AddBrandThunk";
import { AllBrandThunk } from "../Thunk/AllBrandThunk";
import { AttributeThunk } from "../Thunk/AttributeThunk";
import { DeleteAttributeThunk } from "../Thunk/DeleteAttributeThunk";
import { DeleteBrand } from "../Thunk/DeleteBrand";
import { OneAttributeThunk } from "../Thunk/OneAttributeThunk";
import { OneBrandThunk } from "../Thunk/OneBrandThunk";
import { UpdateAttributeThunk } from "../Thunk/UpdateAttributeThunk";
import { UpDateBrand } from "../Thunk/UpDateBrand";
let initState = {
    code: null,
    attributeData: [],
    currentPage: 1,
    lastPage: 1,
    nameAttribute: "",
    // nameBrand_ar: "",
    // nameBrand_fr: "",
    // brandImg: "",
};

let AttributeReducer = createSlice({
    name: "attribute",

    initialState: initState,
    reducers: {
        closeModal: (state, action) => {
            state.nameAttribute = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // =======allBrand===========
            .addCase(AttributeThunk.pending, (state, action) => {})
            .addCase(AttributeThunk.fulfilled, (state, action) => {
                // //console.log(action.payload);
                state.attributeData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AttributeThunk.rejected, (state, action) => {})
            // =========OneAttributeThunk=============
            .addCase(OneAttributeThunk.fulfilled, (state, action) => {
                state.nameAttribute = action.payload.data.name;
                // //console.log(action.payload);
            })
            .addCase(OneAttributeThunk.rejected, (state, action) => {})
            // =========UpdateAttributeThunk=============
            .addCase(UpdateAttributeThunk.fulfilled, (state, action) => {
                // //console.log(action.payload);
            })
            .addCase(UpdateAttributeThunk.rejected, (state, action) => {})
            // =========AddAttributeThunk=============
            .addCase(AddAttributeThunk.fulfilled, (state, action) => {
                // //console.log(action.payload);
            })
            .addCase(AddAttributeThunk.rejected, (state, action) => {})
            // =========DeleteAttributeThunk=============
            .addCase(DeleteAttributeThunk.fulfilled, (state, action) => {
                // //console.log(action.payload);
            })
            .addCase(DeleteAttributeThunk.rejected, (state, action) => {});
    },
});

export default AttributeReducer.reducer;

export const { closeModal } = AttributeReducer.actions;
