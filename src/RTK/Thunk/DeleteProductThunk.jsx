import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let DeleteProductThunk = createAsyncThunk(
  "product/DeleteProductThunk",
  async (arg, ThunkApi) => {
    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}/products/${arg?.id}`,
        Api()
      );
      return res.data;
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
