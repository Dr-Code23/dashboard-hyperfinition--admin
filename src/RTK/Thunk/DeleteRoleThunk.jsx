import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";

export let DeleteRoleThunk = createAsyncThunk(
  "role/DeleteRoleThunk",
  async (arg, ThunkApi) => {
    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.delete(
        `${process.env.REACT_APP_API}/roles/${arg?.id}`,
        Api()
      );
      return res.data;
    } catch (error) {
      // //console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
