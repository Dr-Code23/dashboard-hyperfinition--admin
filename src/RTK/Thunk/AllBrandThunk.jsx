import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let AllBrandThunk = createAsyncThunk(
    "brand/AllBrandThunk",
    async (arg, ThunkApi) => {
        let { rejectWithValue } = ThunkApi;
        try {
            let url = `${process.env.REACT_APP_API}/brands?per_page=5&page=${arg.page}`
            let urlSearch = `${process.env.REACT_APP_API}/brands?per_page=5&page=${arg.page}&handle=${arg.search}`
            let res = await axios.get(
                arg.search !== '' ? urlSearch : url,
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
