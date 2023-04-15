import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api } from "../Api";
export let UploadImgThunk = createAsyncThunk(
  "services/UploadImgThunk",
  async (arg, ThunkApi) => {
    // console.log(arg.img);
    const formData = new FormData();
    formData.append("image", arg?.img);
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
        `${process.env.REACT_APP_API}/upload`,


        formData,
        config
      );
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
