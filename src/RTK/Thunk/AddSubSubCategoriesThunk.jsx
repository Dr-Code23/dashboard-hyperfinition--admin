import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let AddSubSubCategoriesThunk = createAsyncThunk(
    "sub_sub/AddSubSubCategoriesThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_API}/sub_categories`,
                {
                    name: { en: arg?.en, ar: arg?.ar, fr: arg?.fr },
                    parent_id: arg?.sub,
                },
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