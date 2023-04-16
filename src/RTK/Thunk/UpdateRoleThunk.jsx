import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UpdateRoleThunk = createAsyncThunk(
  "role/UpdateRoleThunk",
  async (arg, ThunkApi) => {
    // //console.log(arg);

    let { rejectWithValue } = ThunkApi;
    try {
      let res = await axios.put(
        `${process.env.REACT_APP_API}/roles/${arg.id}`,
        {
          name: arg?.name,
          permissions: arg?.permissions
        },

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
