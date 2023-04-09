import { createSlice } from "@reduxjs/toolkit";
import { SubCategoriesThunk } from "../Thunk/SubCategoriesThunk";
import { SelectParentCategoriesThunk } from "../Thunk/SelectParentCategoriesThunk";

let initState = {
    code: null,
    subcategoriesData: [],
    currentPage: 1,
    lastPage: 1,
    categoriesImg: "",
    categoriesName: {},
    name_en_Error: null,
    name_ar_Error: null,
    name_fr_Error: null,
    selectError: null,
    mainSelectData: [],
};

let SubCategoriesReducer = createSlice({
    name: "sub",

    initialState: initState,
    reducers: {
        // closeError: (state, action) => {
        //     if (action.payload.type === "en") {
        //         state.name_en_Error = null;
        //     }
        //     if (action.payload.type === "ar") {
        //         state.name_ar_Error = null;
        //     }
        //     if (action.payload.type === "fr") {
        //         state.name_fr_Error = null;
        //     }
        //     if (action.payload.type === "img") {
        //         state.avatarError = null;
        //     }
        //     if (action.payload.type === "all") {
        //         state.avatarError = null;
        //         state.name_fr_Error = null;
        //         state.name_ar_Error = null;
        //         state.name_en_Error = null;
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            // =======SubCategoriesThunk===========
            .addCase(SubCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.subcategoriesData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(SubCategoriesThunk.rejected, (state, action) => {})
            // =======SelectParentCategoriesThunk===========
            .addCase(SelectParentCategoriesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.mainSelectData = action.payload.data;
            })
            .addCase(
                SelectParentCategoriesThunk.rejected,
                (state, action) => {}
            );
        // =======SelectParentCategoriesThunk===========

        // .addCase(SelectParentCategoriesThunk.fulfilled, (state, action) => {
        //     // console.log(action.payload);
        //     state.mainSelectData = action.payload.data;
        // })
        // .addCase(
        //     SelectParentCategoriesThunk.rejected,
        //     (state, action) => {}
        // );
    },
});

export default SubCategoriesReducer.reducer;

// export let { closeError } = CategoriesReducer.actions;
