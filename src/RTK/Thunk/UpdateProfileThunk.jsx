import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpdateProfileThunk = createAsyncThunk(
    "profile/UpdateProfileThunk",
    async (arg, ThunkApi) => {
        //console.log(arg);
        const formData = new FormData();
        formData.append("name", arg.name);
        formData.append("avatar", arg?.avatar);
        formData.append("email", arg?.email);
        formData.append("password_confirmation", arg?.password_confirmation);
        formData.append("password", arg?.password);

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
                `${process.env.REACT_APP_API}/profile`,
                formData,
                config
            );
            // //console.log(res.data);

            return res.data;
        } catch (error) {
            //console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);
