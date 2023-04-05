import { createSlice } from "@reduxjs/toolkit";
import { AllBrandThunk } from "../Thunk/AllBrandThunk";
import { OneBrandThunk } from "../Thunk/OneBrandThunk";
import { UpDateBrand } from "../Thunk/UpDateBrand";
let initState = {
    code: null,
    brandData: [],
    currentPage: 1,
    lastPage: 1,
    nameBrand_en: "",
    nameBrand_ar: "",
    nameBrand_fr: "",
    brandImg: "",
};

let BrandReducer = createSlice({
    name: "brand",

    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // =======allBrand===========

            .addCase(AllBrandThunk.pending, (state, action) => {})
            .addCase(AllBrandThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.brandData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllBrandThunk.rejected, (state, action) => {})
            // =======oneBrand===========
            .addCase(OneBrandThunk.fulfilled, (state, action) => {
                state.nameBrand_en = action.payload.data.name.en;
                state.nameBrand_ar = action.payload.data.name.ar;
                state.nameBrand_fr = action.payload.data.name.fr;
                state.brandImg = action.payload.data.image;
            })
            .addCase(OneBrandThunk.rejected, (state, action) => {})
            // =======oneBrand===========
            .addCase(UpDateBrand.fulfilled, (state, action) => {
                // console.log(action.payload);
            })
            .addCase(UpDateBrand.rejected, (state, action) => {});
    },
});

export default BrandReducer.reducer;

// export { }=LoginReducer.actions
