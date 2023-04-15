import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let DeleteServicesThunk = createAsyncThunk(
  "services/DeleteServicesThunk",
  async (arg, ThunkApi) => {
    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}/services/${arg?.id}`,
        Api()
      );
      return res.data;
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
