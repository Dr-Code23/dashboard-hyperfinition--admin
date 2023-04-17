import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let SelectProjectThunk = createAsyncThunk(
    "payment/SelectProjectThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API}/select_menu/projects`,
                Api()
            );
            // //console.log(res.data);

            return res.data;
        } catch (error) {
            //console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
