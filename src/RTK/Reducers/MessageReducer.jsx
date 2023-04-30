import { createSlice } from "@reduxjs/toolkit";

let initState = {
    typeAlert: false,
};

let MessageReducer = createSlice({
    name: "message",

    initialState: initState,
    reducers: {
        closeAlert: (state, action) => {
            state.typeAlert = false;
        },
        openAlert: (state, action) => {
            state.typeAlert = true;
        },
        openMessageAlert: (state, action) => {
            state.typeAlert = true;
        },
    },
});
export default MessageReducer.reducer;

export let { closeAlert, openAlert, openMessageAlert } = MessageReducer.actions;
