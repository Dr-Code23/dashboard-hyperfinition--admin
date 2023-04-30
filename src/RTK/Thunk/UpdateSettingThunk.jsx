import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateSettingThunk = createAsyncThunk(
    "setting/UpdateSettingThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        const formData = new FormData();
        formData.append("phones", arg?.phones);
        formData.append("facebook", arg?.facebook);
        formData.append("instagram", arg?.instagram);
        formData.append("youtube", arg?.youtube);
        formData.append("whatsapp", arg?.whatsapp);
        formData.append("address", arg?.address);
        formData.append("email", arg?.email);
        formData.append("logo", arg?.logo);
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
                `${process.env.REACT_APP_API}/settings`,
                formData,
                config
            );
            // console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);/
            return rejectWithValue(error.response.data);
        }
    }
);

