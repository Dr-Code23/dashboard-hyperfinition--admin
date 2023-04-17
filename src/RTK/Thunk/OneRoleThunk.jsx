import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let OneRoleThunk = createAsyncThunk(
  "role/OneRoleThunk",
  async (arg, ThunkApi) => {
    // //console.log(arg);

    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API}/roles/${arg.id}`,


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
