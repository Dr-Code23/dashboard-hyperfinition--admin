import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpDateBrand = createAsyncThunk(
    "brand/UpDateBrand",
    async (arg, ThunkApi) => {
        // //console.log(arg);
        const formData = new FormData();
        formData.append(
            "name",
            JSON.stringify({ en: arg?.en, ar: arg?.ar, fr: arg?.fr })
        );
        formData.append("img", arg?.img);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Locale: localStorage.getItem("language") || "en",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
        };
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_API}/brands/${arg?.id}`,
                formData,
                config
            );
            return res.data;
        } catch (error) {
            // //console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
