import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let PermissionsThunk = createAsyncThunk(
    "role/PermissionsThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API}/select_menu/permissions`,
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
