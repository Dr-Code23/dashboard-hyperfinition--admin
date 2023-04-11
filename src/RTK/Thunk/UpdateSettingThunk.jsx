import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpdateSettingThunk = createAsyncThunk(
    "setting/UpdateSettingThunk",
    async (arg, ThunkApi) => {
        // console.log(arg);
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.post(
                `${process.env.REACT_APP_API}/settings`,

                {
                    phones: arg?.phones,
                    facebook: arg?.facebook,
                    instagram: arg?.instagram,
                    youtube: arg?.youtube,
                    whatsapp: arg?.whatsapp,
                    address: arg?.address,
                },
                Api()
            );
            // console.log(res.data);
            return res.data;
        } catch (error) {
            // console.log(error.response.data);/
            return rejectWithValue(error.response.data);
        }
    }
);
