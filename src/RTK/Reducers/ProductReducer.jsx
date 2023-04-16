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
import { AllProductThunk } from "../Thunk/AllProductThunk";
import { ProductStatusThunk } from "../Thunk/ProductStatusThunk";
import { DeleteProductThunk } from "../Thunk/DeleteProductThunk";
import { SelectBrandThunk } from "../Thunk/SelectBrandThunk";
import { SelectUnitThunk } from "../Thunk/SelectUnitThunk";
import { SelectAttributesThunk } from "../Thunk/SelectAttributesThunk";
import { AddProductThunk } from "../Thunk/AddProductThunk";
import { OneProductThunk } from "../Thunk/OneProductThunk";
import { UpdateProductThunk } from "../Thunk/UpdateProductThunk";

let initState = {
  code: null,
  currentPage: 1,
  lastPage: 1,
  productData: [],
  oneImgData: [],
  oneDataProduct: '',
  imgUpload: [],
  categoriesSelectData: [],
  unitSelectData: [],
  attributesSelectData: [],
  brandSelectData: [],
  tableDataPayment: [],
  viewTableData: [],
  viewData: [],
  oneDesc: "",
  oneGeneral: "",
  onePrice: "",
  price_Error: null,
  phone_Error: null,
  category_id_Error: null,
  brand_id_Error: null,
  unit_id_Error: null,
  att_id_Error: null,
  images_Error: null,
  name_Error_en: null,
  name_Error_ar: null,
  name_Error_fr: null,
  desc_Error_en: null,
  desc_Error_ar: null,
  desc_Error_fr: null,
};

let ProductReducer = createSlice({
  name: "product",

  initialState: initState,
  reducers: {
    DataView: (state, action) => {
      state.oneDataProduct = ''
      state.oneImgData = []
    },

    closeError: (state, action) => {
      state.price_Error = null;
      state.phone_Error = null;
      state.brand_id_Error = null;
      state.unit_id_Error = null;
      state.att_id_Error = null;
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
      .addCase(AllProductThunk.pending, (state, action) => { })
      .addCase(AllProductThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
        state.productData = action.payload?.data;
        state.currentPage = action.payload.meta.current_page;
        state.lastPage = action.payload.meta.last_page;
      })
      .addCase(AllProductThunk.rejected, (state, action) => { })
      // =======ProductStatusThunk===========
      .addCase(ProductStatusThunk.pending, (state, action) => { })
      .addCase(ProductStatusThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
      })
      // .addCase(ServicesStatusThunk.rejected, (state, action) => { })
      // =======DeleteProductThunk===========
      .addCase(DeleteProductThunk.pending, (state, action) => { })
      .addCase(DeleteProductThunk.fulfilled, (state, action) => { })
      // =======UploadImgThunk===========
      .addCase(UploadImgThunk.pending, (state, action) => { })
      .addCase(UploadImgThunk.fulfilled, (state, action) => {
        state.imgUpload = action.payload.data

      })
      // =======OneProductThunk===========
      .addCase(OneProductThunk.pending, (state, action) => { })
      .addCase(OneProductThunk.fulfilled, (state, action) => {
        state.oneDataProduct = action.payload.data
        state.oneImgData = action.payload.data.images

      })

      // =======SelectProductThunk===========
      .addCase(SelectAllCategoriesThunk.pending, (state, action) => { })
      .addCase(SelectAllCategoriesThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
        state.categoriesSelectData = action.payload?.data;
      })
      // =======SelectBrandThunk===========
      .addCase(SelectBrandThunk.pending, (state, action) => { })
      .addCase(SelectBrandThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
        state.brandSelectData = action.payload?.data;
      })
      // =======SelectUnitThunk===========
      .addCase(SelectUnitThunk.pending, (state, action) => { })
      .addCase(SelectUnitThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
        state.unitSelectData = action.payload?.data;
      })
      // =======SelectUnitThunk===========
      .addCase(SelectAttributesThunk.pending, (state, action) => { })
      .addCase(SelectAttributesThunk.fulfilled, (state, action) => {
        // //console.log(action.payload);
        state.attributesSelectData = action.payload?.data;
      })

      // // =======AddServicesThunk===========
      .addCase(AddProductThunk.fulfilled, (state, action) => { })
      .addCase(AddProductThunk.rejected, (state, action) => {
        state.price_Error = action.payload?.data?.unit_price;
        state.phone_Error = action.payload?.data?.quantity;
        state.category_id_Error = action.payload?.data?.category_id;
        state.att_id_Error = action.payload?.data?.attribute_id;
        state.unit_id_Error = action.payload?.data?.unit_id;
        state.brand_id_Error = action.payload?.data?.brand_id;
        state.images_Error = action.payload?.data?.images;
        state.name_Error_en = action.payload?.data?.["name.en"];
        state.name_Error_ar = action.payload?.data?.["name.ar"];
        state.name_Error_fr = action.payload?.data?.["name.fr"];
        state.desc_Error_en = action.payload?.data?.["name.en"];
        state.desc_Error_ar = action.payload?.data?.["name.ar"];
        state.desc_Error_fr = action.payload?.data?.["name.fr"];
      })
      // // =======UpdateProductThunk===========
      .addCase(UpdateProductThunk.fulfilled, (state, action) => { })
      .addCase(UpdateProductThunk.rejected, (state, action) => {
        state.price_Error = action.payload?.data?.unit_price;
        state.phone_Error = action.payload?.data?.quantity;
        state.category_id_Error = action.payload?.data?.category_id;
        state.att_id_Error = action.payload?.data?.attribute_id;
        state.unit_id_Error = action.payload?.data?.unit_id;
        state.brand_id_Error = action.payload?.data?.brand_id;
        state.images_Error = action.payload?.data?.images;
        state.name_Error_en = action.payload?.data?.["name.en"];
        state.name_Error_ar = action.payload?.data?.["name.ar"];
        state.name_Error_fr = action.payload?.data?.["name.fr"];
        state.desc_Error_en = action.payload?.data?.["name.en"];
        state.desc_Error_ar = action.payload?.data?.["name.ar"];
        state.desc_Error_fr = action.payload?.data?.["name.fr"];
      })

    // .addCase(UpdateServicesThunk.fulfilled, (state, action) => { })
    // .addCase(UpdateServicesThunk.rejected, (state, action) => {
    //   state.price_Error = action.payload?.data?.price;
    //   state.phone_Error = action.payload?.data?.phone;
    //   state.category_id_Error = action.payload?.data?.category_id;
    //   state.images_Error = action.payload?.data?.images;
    //   state.name_Error_en = action.payload?.data?.["name.en"];
    //   state.name_Error_ar = action.payload?.data?.["name.ar"];
    //   state.name_Error_fr = action.payload?.data?.["name.fr"];
    //   state.desc_Error_en = action.payload?.data?.["name.en"];
    //   state.desc_Error_ar = action.payload?.data?.["name.ar"];
    //   state.desc_Error_fr = action.payload?.data?.["name.fr"];


    // });
  },
});

export default ProductReducer.reducer;

export let { closeModal, closeError, DataView } = ProductReducer.actions;
