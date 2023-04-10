import { createSlice } from "@reduxjs/toolkit";
import { SubCategoriesThunk } from "../Thunk/SubCategoriesThunk";
import { SelectParentCategoriesThunk } from "../Thunk/SelectParentCategoriesThunk";
import { AddSubCategoriesThunk } from "../Thunk/AddSubCategoriesThunk";
import { OneSubCategoriesThunk } from "../Thunk/OneSubCategoriesThunk";
import { UpdateSubCategoriesThunk } from "../Thunk/UpdateSubCategoriesThunk";
import { DeleteSubCategoriesThunk } from "../Thunk/DeleteSubCategoriesThunk";
import { SelectSubCategoriesThunk } from "../Thunk/SelectSubCategoriesThunk";
import { SubSubCategoriesThunk } from "../Thunk/SubSubCategoriesThunk";
import { AddSubSubCategoriesThunk } from "../Thunk/AddSubSubCategoriesThunk";
import { OneSubSubCategoriesThunk } from "../Thunk/OneSubSubCategoriesThunk";
import { UpdateSubSubCategoriesThunk } from "../Thunk/UpdateSubSubCategoriesThunk";

let initState = {
    code: null,
    subSubcategoriesData: [],
    subSubcategoriesName: {},
    currentPage: 1,
    lastPage: 1,
    categoriesImg: "",
    name_en_Error: null,
    name_ar_Error: null,
    name_fr_Error: null,
    selectError: null,
    mainSelectData: [],
    subSelectData: [],
};

let SubSubCategoriesReducer = createSlice({
    name: "sub_sub",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            if (action.payload.type === "en") {
                state.name_en_Error = null;
            }
            if (action.payload.type === "ar") {
                state.name_ar_Error = null;
            }
            if (action.payload.type === "fr") {
                state.name_fr_Error = null;
            }
            if (action.payload.type === "select") {
                state.selectError = null;
            }
            if (action.payload.type === "all") {
                state.subSubcategoriesName = {};
                state.name_fr_Error = null;
                state.name_ar_Error = null;
                state.name_en_Error = null;
            }
        },
        removeCategoriesData: (state, action) => {
            state.subSubcategoriesData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // =======SubCategoriesThunk===========
            .addCase(SubSubCategoriesThunk.fulfilled, (state, action) => {
                state.subSubcategoriesData = action.payload.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(SubSubCategoriesThunk.rejected, (state, action) => {})
            // =======SelectParentCategoriesThunk===========
            .addCase(SelectParentCategoriesThunk.fulfilled, (state, action) => {
                state.mainSelectData = action.payload.data;
            })
            .addCase(
                SelectParentCategoriesThunk.rejected,
                (state, action) => {}
            )
            // =======SelectSubCategoriesThunk===========
            .addCase(SelectSubCategoriesThunk.fulfilled, (state, action) => {
                state.subSelectData = action.payload.data;
            })
            .addCase(SelectSubCategoriesThunk.rejected, (state, action) => {})
            // =======AddSubSubCategoriesThunk===========

            .addCase(AddSubSubCategoriesThunk.fulfilled, (state, action) => {})
            .addCase(AddSubSubCategoriesThunk.rejected, (state, action) => {
                state.name_en_Error = action.payload?.data?.["name.en"];
                state.name_ar_Error = action.payload?.data?.["name.ar"];
                state.name_fr_Error = action.payload?.data?.["name.fr"];
                state.selectError = action.payload?.data?.parent_id;
            })
            // =======OneSubSubCategoriesThunk===========
            .addCase(OneSubSubCategoriesThunk.fulfilled, (state, action) => {
                state.subSubcategoriesName = action.payload.data.name;
            })
            .addCase(OneSubSubCategoriesThunk.rejected, (state, action) => {})
            // =======UpdateSubCategoriesThunk===========

            .addCase(
                UpdateSubSubCategoriesThunk.fulfilled,
                (state, action) => {}
            )
            .addCase(UpdateSubSubCategoriesThunk.rejected, (state, action) => {
                state.name_en_Error = action.payload?.data?.["name.en"];
                state.name_ar_Error = action.payload?.data?.["name.ar"];
                state.name_fr_Error = action.payload?.data?.["name.fr"];
            });
    },
});

export default SubSubCategoriesReducer.reducer;

export let { closeError, removeCategoriesData } =
    SubSubCategoriesReducer.actions;
