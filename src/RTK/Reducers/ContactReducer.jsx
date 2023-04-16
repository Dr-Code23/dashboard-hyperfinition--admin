import { createSlice } from "@reduxjs/toolkit";

import { ContactThunk } from "../Thunk/ContactThunk";
let initState = {
    code: null,
    contactData: [],
    currentPage: 1,
    lastPage: 1,
    nameBrand_en: "",
    nameBrand_ar: "",
    nameBrand_fr: "",
    brandImg: "",
};

let ContactReducer = createSlice({
    name: "contact",

    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // =======contact===========
            .addCase(ContactThunk.pending, (state, action) => {})
            .addCase(ContactThunk.fulfilled, (state, action) => {
                // //console.log(action.payload);
                state.contactData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(ContactThunk.rejected, (state, action) => {});
    },
});

export default ContactReducer.reducer;

// export { }=LoginReducer.actions
