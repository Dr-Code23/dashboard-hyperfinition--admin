import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let AllUsersThunk = createAsyncThunk(
    "user/AllUsersThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let res = await axios.get(
                `${process.env.REACT_APP_API}/users?per_page=5&page=${arg.page}`,
                Api()
            );
            // console.log(res.data);

            return res.data;
        } catch (error) {
            // console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);