import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export let LoginThunk = createAsyncThunk('login/LoginThunk', async (arg, ThunkApi) => {
  let { rejectWithValue } = ThunkApi
  console.log(arg)
  try {
    let res = await axios.post(`https://abdjan.everest-ci.com/api/test`, {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    console.log(res.data)

    return res
  } catch (error) {
    return rejectWithValue(error.message)
  }
})