import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let OneBrandThunk = createAsyncThunk(
    "brand/OneBrandThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await Api.get(`brands/${arg?.id}`);

            return res.data;
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data);
        }
    }
);
