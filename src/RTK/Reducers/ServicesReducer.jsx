import { createSlice } from "@reduxjs/toolkit";

import { SelectProductThunk } from "../Thunk/SelectProductThunk";
import { AllProjectThunk } from "../Thunk/AllProjectThunk";
import { ViewProjectThunk } from "../Thunk/ViewProjectThunk";
import { DeleteProjectThunk } from "../Thunk/DeleteProjectThunk";
import { UpdateProjectThunk } from "../Thunk/UpdateProjectThunk";
import { AllServicesThunk } from "../Thunk/AllServicesThunk";
import { ServicesStatusThunk } from "../Thunk/ServicesStatusThunk";
import { DeleteServicesThunk } from "../Thunk/DeleteServicesThunk";
import { SelectAllCategoriesThunk } from "../Thunk/SelectAllCategoriesThunk";
import { UploadImgThunk } from "../Thunk/uploadImgThunk";
import { AddServicesThunk } from "../Thunk/AddServicesThunk";
import { OneServicesThunk } from "../Thunk/OneServicesThunk";
import { UpdateServicesThunk } from "../Thunk/UpdateServicesThunk";

let initState = {
  code: null,
  currentPage: 1,
  lastPage: 1,
  servicesData: [],
  oneImgData: [],
  oneDataServices: '',
  imgUpload: [],
  categoriesSelectData: [],
  tableDataPayment: [],
  viewTableData: [],
  viewData: [],
  oneDesc: "",
  oneGeneral: "",
  onePrice: "",
  price_Error: null,
  phone_Error: null,
  category_id_Error: null,
  images_Error: null,
  name_Error_en: null,
  name_Error_ar: null,
  name_Error_fr: null,
  desc_Error_en: null,
  desc_Error_ar: null,
  desc_Error_fr: null,
};

let ServicesReducer = createSlice({
  name: "services",

  initialState: initState,
  reducers: {
    DataView: (state, action) => {
      state.oneDataServices = ''
      state.oneImgData = []
    },

    closeError: (state, action) => {
      state.price_Error = null;
      state.phone_Error = null;
      state.category_id_Error = null;
      state.images_Error = null;
      state.name_Error_en = null;
      state.name_Error_ar = null;
      state.name_Error_fr = null;
      state.desc_Error_en = null;
      state.desc_Error_ar = null;
      state.desc_Error_fr = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =======AllServicesThunk===========
      .addCase(AllServicesThunk.pending, (state, action) => { })
      .addCase(AllServicesThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.servicesData = action.payload?.data;
        state.currentPage = action.payload.meta.current_page;
        state.lastPage = action.payload.meta.last_page;
      })
      .addCase(AllServicesThunk.rejected, (state, action) => { })
      // =======ServicesStatusThunk===========
      .addCase(ServicesStatusThunk.pending, (state, action) => { })
      .addCase(ServicesStatusThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
      })
      .addCase(ServicesStatusThunk.rejected, (state, action) => { })
      // =======DeleteProjectThunk===========
      .addCase(DeleteServicesThunk.pending, (state, action) => { })
      .addCase(DeleteServicesThunk.fulfilled, (state, action) => { })
      // =======UploadImgThunk===========
      .addCase(UploadImgThunk.pending, (state, action) => { })
      .addCase(UploadImgThunk.fulfilled, (state, action) => {
        state.imgUpload = action.payload.data

      })
      // =======OneServicesThunk===========
      .addCase(OneServicesThunk.pending, (state, action) => { })
      .addCase(OneServicesThunk.fulfilled, (state, action) => {
        state.oneDataServices = action.payload.data
        state.oneImgData = action.payload.data.images

      })


      // =======SelectProductThunk===========
      .addCase(SelectAllCategoriesThunk.pending, (state, action) => { })
      .addCase(SelectAllCategoriesThunk.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.categoriesSelectData = action.payload?.data;
      })

      // // =======AddServicesThunk===========
      .addCase(AddServicesThunk.fulfilled, (state, action) => { })
      .addCase(AddServicesThunk.rejected, (state, action) => {
        state.price_Error = action.payload?.data?.price;
        state.phone_Error = action.payload?.data?.phone;
        state.category_id_Error = action.payload?.data?.category_id;
        state.images_Error = action.payload?.data?.images;
        state.name_Error_en = action.payload?.data?.["name.en"];
        state.name_Error_ar = action.payload?.data?.["name.ar"];
        state.name_Error_fr = action.payload?.data?.["name.fr"];
        state.desc_Error_en = action.payload?.data?.["name.en"];
        state.desc_Error_ar = action.payload?.data?.["name.ar"];
        state.desc_Error_fr = action.payload?.data?.["name.fr"];
      })
      // // =======UpdateProjectThunk===========
      .addCase(UpdateServicesThunk.fulfilled, (state, action) => { })
      .addCase(UpdateServicesThunk.rejected, (state, action) => {
        state.price_Error = action.payload?.data?.price;
        state.phone_Error = action.payload?.data?.phone;
        state.category_id_Error = action.payload?.data?.category_id;
        state.images_Error = action.payload?.data?.images;
        state.name_Error_en = action.payload?.data?.["name.en"];
        state.name_Error_ar = action.payload?.data?.["name.ar"];
        state.name_Error_fr = action.payload?.data?.["name.fr"];
        state.desc_Error_en = action.payload?.data?.["name.en"];
        state.desc_Error_ar = action.payload?.data?.["name.ar"];
        state.desc_Error_fr = action.payload?.data?.["name.fr"];


      });
  },
});

export default ServicesReducer.reducer;

export let { closeModal, closeError, DataView } = ServicesReducer.actions;
