import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export let UpdateSettingThunk = createAsyncThunk(
    "setting/UpdateSettingThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        const formData = new FormData();
        formData.append("phones", JSON.stringify(arg?.phones));
        formData.append("facebook", JSON.stringify(arg?.facebook));
        formData.append("instagram", JSON.stringify(arg?.instagram));
        formData.append("youtube", JSON.stringify(arg?.youtube));
        formData.append("whatsapp", JSON.stringify(arg?.whatsapp));
        formData.append("address", JSON.stringify(arg?.address));
        formData.append("email", JSON.stringify(arg?.email));
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

