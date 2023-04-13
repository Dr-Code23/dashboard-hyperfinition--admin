import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let AllGeneralThunk = createAsyncThunk(
    "general/AllGeneralThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API}/general_expenses?per_page=5&page=${arg.page}`,
                Api()
            );
            // console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
