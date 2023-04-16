import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let AddPaymentThunk = createAsyncThunk(
    "payment/AddPaymentThunk",
    async (arg, ThunkApi) => {
        // //console.log(arg);

        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_API}/project_payments`,
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
