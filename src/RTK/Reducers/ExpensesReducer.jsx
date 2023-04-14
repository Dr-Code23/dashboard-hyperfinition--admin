import { createSlice } from "@reduxjs/toolkit";

import { SelectProjectThunk } from "../Thunk/SelectProjectThunk";
import { AllExpensesThunk } from "../Thunk/AllExpensesThunk";
import { ViewExpensesThunk } from "../Thunk/ViewExpensesThunk";
import { SelectProductThunk } from "../Thunk/SelectProductThunk";
import { UpdateExpensesThunk } from "../Thunk/UpdateExpensesThunk";

let initState = {
    code: null,
    currentPage: 1,
    lastPage: 1,
    expensesData: [],
    projectSelectData: [],
    productSelectData: [],
    tableDataPayment: [],
    viewTableData: [],
    viewData: [],
    oneDesc: "",
    oneGeneral: "",
    onePrice: "",
    productError: null,
};

let ExpensesReducer = createSlice({
    name: "expenses",

    initialState: initState,
    reducers: {
        closeError: (state, action) => {
            state.productError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // =======AllExpensesThunk===========
            .addCase(AllExpensesThunk.pending, (state, action) => {})
            .addCase(AllExpensesThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.expensesData = action.payload?.data;
                state.currentPage = action.payload.meta.current_page;
                state.lastPage = action.payload.meta.last_page;
            })
            .addCase(AllExpensesThunk.rejected, (state, action) => {})
            // =======SelectProjectThunk===========
            .addCase(SelectProjectThunk.pending, (state, action) => {})
            .addCase(SelectProjectThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.projectSelectData = action.payload?.data;
            })
            .addCase(SelectProjectThunk.rejected, (state, action) => {})
            // =======SelectProductThunk===========
            .addCase(SelectProductThunk.pending, (state, action) => {})
            .addCase(SelectProductThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.productSelectData = action.payload?.data;
            })
            .addCase(SelectProductThunk.rejected, (state, action) => {})

            // // =======ViewExpensesThunk===========
            .addCase(ViewExpensesThunk.fulfilled, (state, action) => {
                state.viewData = action.payload?.data;
                state.viewTableData = action.payload?.data.project_expenses;
            })
            .addCase(ViewExpensesThunk.rejected, (state, action) => {})
            // // =======UpdateExpensesThunk===========
            .addCase(UpdateExpensesThunk.fulfilled, (state, action) => {})
            .addCase(UpdateExpensesThunk.rejected, (state, action) => {
                state.productError = action.payload?.data?.products;
            });
    },
});

export default ExpensesReducer.reducer;

export let { closeModal, closeError } = ExpensesReducer.actions;
