import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpdateAttributeThunk = createAsyncThunk(
    "attribute/UpdateAttributeThunk",
    async (arg, ThunkApi) => {
        // //console.log(arg);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API}/attributes/${arg?.id}`,
                {
                    name: arg?.name,
                },
                Api()
            );
            // //console.log(res.data);
            return res.data;
        } catch (error) {
            // //console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
