import { createSlice } from "@reduxjs/toolkit";
import { AddUserThunk } from "../Thunk/AddUserThunk";
import { AllUsersThunk } from "../Thunk/AllUsersThunk";
import { OneUserThunk } from "../Thunk/OneUserThunk";
import { RolesDataThunk } from "../Thunk/RolesDataThunk";
import { UpdateUserThunk } from "../Thunk/UpdateUserThunk";
import { DeleteUserThunk } from "../Thunk/DeleteUserThunk";
import { AllRolesThunk } from "../Thunk/AllRolesThunk";
import { PermissionsThunk } from "../Thunk/PermissionsThunk";
import { AddRoleThunk } from "../Thunk/AddRoleThunk";
import { OneRoleThunk } from "../Thunk/OneRoleThunk";
import { UpdateRoleThunk } from "../Thunk/UpdateRoleThunk";
import { DeleteRoleThunk } from "../Thunk/DeleteRoleThunk";

let initState = {
  code: null,
  userData: [],
  currentPage: 1,
  lastPage: 1,
  OnePermissionsData: [],
  oneRoleName: "",
  roleData: [],
  permissionsData: [],
  nameError: null,
  roleError: null,

};

let RolesReducer = createSlice({
  name: "role",

  initialState: initState,
  reducers: {
    closeRole: (state, action) => {
      state.OnePermissionsData = [];
      state.oneRoleName = ""
    },
    closeError: (state, action) => {
      state.nameError = null;
      state.roleError = null;

    },
  },
  extraReducers: (builder) => {
    builder
      // =======role data===========
      .addCase(AllRolesThunk.pending, (state, action) => { })
      .addCase(AllRolesThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
        state.roleData = action.payload?.data;
        state.currentPage = action.payload.meta.current_page;
        state.lastPage = action.payload.meta.last_page;
      })
      .addCase(AllRolesThunk.rejected, (state, action) => { })
      // ======= PermissionsThunk===========
      .addCase(PermissionsThunk.pending, (state, action) => { })
      .addCase(PermissionsThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
        state.permissionsData = action.payload?.data;
      })
      .addCase(PermissionsThunk.rejected, (state, action) => { })
      // =======AddUserThunk===========
      .addCase(AddRoleThunk.fulfilled, (state, action) => { })
      .addCase(AddRoleThunk.rejected, (state, action) => {
        // //console.log(action.payload);
        state.nameError = action.payload?.data?.name;
        state.roleError = action.payload?.data?.permissions;
      })
      // // =======OneRoleThunk===========
      .addCase(OneRoleThunk.fulfilled, (state, action) => {
        state.OnePermissionsData = action.payload?.data.permissions;
        state.oneRoleName = action.payload?.data.name;
      })      // =======AddUserThunk===========
      .addCase(UpdateRoleThunk.fulfilled, (state, action) => { })
      .addCase(UpdateRoleThunk.rejected, (state, action) => {
        // //console.log(action.payload);
        state.nameError = action.payload?.data?.name;
        state.roleError = action.payload?.data?.permissions;
      })
      // =======DeleteUserThunk===========
      .addCase(DeleteRoleThunk.fulfilled, (state, action) => { })
      .addCase(DeleteRoleThunk.rejected, (state, action) => {
        // //console.log(action.payload);
      });
  },
});

export default RolesReducer.reducer;

export let { closeRole, closeError } = RolesReducer.actions;
