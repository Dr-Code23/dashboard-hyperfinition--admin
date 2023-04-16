import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpdateTablePaymentThunk = createAsyncThunk(
    "payment/UpdateTablePaymentThunk",
    async (arg, ThunkApi) => {
        // //console.log(arg);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.put(
                `${process.env.REACT_APP_API}/project_payments/${arg.id}`,
                {
                    price: arg?.price,
                    project_id: arg.project_id,
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
