import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let AddAdsThunk = createAsyncThunk(
    "ads/AddAdsThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        const formData = new FormData();
        formData.append(
            "title",
            JSON.stringify({
                en: arg.name.en,
                ar: arg.name.ar,
                fr: arg.name.fr,
            })
        );
        formData.append(
            "description",
            JSON.stringify({
                en: arg.desc.en,
                ar: arg.desc.ar,
                fr: arg.desc.fr,
            })
        );
        formData.append("image", arg?.img);
        formData.append("discount", arg?.discount);
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
                `${process.env.REACT_APP_API}/ads`,
                formData,
                config
            );
            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
