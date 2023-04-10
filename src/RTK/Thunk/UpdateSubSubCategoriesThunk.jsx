import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpdateSubSubCategoriesThunk = createAsyncThunk(
    "sub_sub/UpdateSubSubCategoriesThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API}/sub_categories/${arg.sub}/${arg.sub_sub}`,
                {
                    name: { en: arg?.en, ar: arg?.ar, fr: arg?.fr },
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
