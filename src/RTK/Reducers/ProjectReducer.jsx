import { createSlice } from "@reduxjs/toolkit";

import { SelectProductThunk } from "../Thunk/SelectProductThunk";
import { AllProjectThunk } from "../Thunk/AllProjectThunk";
import { ViewProjectThunk } from "../Thunk/ViewProjectThunk";
import { DeleteProjectThunk } from "../Thunk/DeleteProjectThunk";
import { UpdateProjectThunk } from "../Thunk/UpdateProjectThunk";

let initState = {
    code: null,
    currentPage: 1,
    lastPage: 1,
    projectData: [],
    projectSelectData: [],
    productSelectData: [],
    tableDataPayment: [],
    viewTableData: [],
    viewData: [],
    oneDesc: "",
    oneGeneral: "",
    onePrice: "",
    productError: null,
    projectError: null,
    customerError: null,
    totalError: null,
    startError: null,
    endError: null,
};

let ProjectReducer = createSlice({
    name: "project",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            state.productError = null;
            state.projectError = null;
            state.customerError = null;
            state.totalError = null;
            state.startError = null;
            state.endError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======AllExpensesThunk===========
            .addCase(AllProjectThunk.pending, (state, action) => {})
            .addCase(AllProjectThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.projectData = action.payload?.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllProjectThunk.rejected, (state, action) => {})
            // // =======ViewProjectThunk===========
            .addCase(ViewProjectThunk.fulfilled, (state, action) => {
                state.viewData = action.payload?.data;
                state.viewTableData = action.payload?.data.materials;
            })
            .addCase(ViewProjectThunk.rejected, (state, action) => {})
            // =======DeleteProjectThunk===========
            .addCase(DeleteProjectThunk.pending, (state, action) => {})
            .addCase(DeleteProjectThunk.fulfilled, (state, action) => {})

            // =======SelectProductThunk===========
            .addCase(SelectProductThunk.pending, (state, action) => {})
            .addCase(SelectProductThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.productSelectData = action.payload?.data;
            })
            .addCase(SelectProductThunk.rejected, (state, action) => {})

            // // =======UpdateProjectThunk===========
            .addCase(UpdateProjectThunk.fulfilled, (state, action) => {})
            .addCase(UpdateProjectThunk.rejected, (state, action) => {
                state.productError = action.payload?.data?.materials;
                state.projectError = action.payload?.data?.project_name;
                state.projectError = action.payload?.data?.project;
                state.customerError = action.payload?.data?.customer_name;
                state.totalError = action.payload?.data?.project_total;
                state.startError = action.payload?.data?.start_date;
                state.endError = action.payload?.data?.end_date;
            });
    },
});

export default ProjectReducer.reducer;

export let { closeModal, closeError } = ProjectReducer.actions;
