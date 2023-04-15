import { Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, IconButton } from "@mui/material";
import "./ServicesAdd.css";
import SelectBox from "../SelectBox/SelectBox";
import img from "../../assets/Img/default.jpg";
import ImageUploading from "react-images-uploading";
import { DeleteForever } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectAllCategoriesThunk } from "../../RTK/Thunk/SelectAllCategoriesThunk";
import { UploadImgThunk } from "../../RTK/Thunk/uploadImgThunk";
import { AddServicesThunk } from "../../RTK/Thunk/AddServicesThunk";
import { closeError } from "../../RTK/Reducers/ServicesReducer";
let selectData = ["name", "email", "pass"];
const ServicesAdd = () => {
  let { t, i18n } = useTranslation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [images, setImages] = React.useState([]);
  // console.log(images);

  const [selectTarget, setSelectTarget] = React.useState({
    Categories: "",
  });
  const [targetIdSelect, setTargetIdSelect] = React.useState({
    categories: "",
  });
  const [inputValue, setInputValue] = useState({
    category_Name_en: "",
    category_Name_ar: "",
    category_Name_fr: "",
    desc_en: "",
    desc_ar: "",
    desc_fr: "",
    price: "",
    phone: "",
  });
  let { categoriesSelectData,
    price_Error,
    phone_Error,
    category_id_Error,
    images_Error,
    name_Error_en,
    name_Error_ar,
    name_Error_fr,
    desc_Error_en,
    desc_Error_ar,
    desc_Error_fr, } = useSelector(
      (state) => state.ServicesReducer
    );
  const [imgeDataTarget, setImgeDataTarget] = useState([]);
  const [imgeTargetAction, setImgeTargetAction] = useState({
    index: '',
    type: '',
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (i18n.language === "en") {
      setValue(0);
    }
    if (i18n.language === "ar") {
      setValue(1);
    }
    if (i18n.language === "fr") {
      setValue(2);
    }
  }, [i18n.language]);

  // =====data===========
  useEffect(() => {
    dispatch(SelectAllCategoriesThunk());
  }, [dispatch]);

  // handle select on loading

  useEffect(() => {
    if (targetIdSelect.categories == "" && categoriesSelectData.length) {
      setTargetIdSelect({
        ...targetIdSelect,
        categories: categoriesSelectData[0]?.id,
      });
    }
  }, [categoriesSelectData, targetIdSelect]);
  /// handle img all
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(addUpdateIndex)
    // console.log(imageList[addUpdateIndex]?.file);

    if (imgeTargetAction.type == 'upload') {
      dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file })).unwrap()
        .then((res) => {
          // console.log(res.data[0]);
          let getRes = [...imgeDataTarget]
          getRes.push(res.data[0])
          // console.log(getRes)
          setImgeDataTarget(getRes)
          setImgeTargetAction({
            index: '',
            type: '',
          })
        })
        .catch((error) => {
          // console.log(error);
          // handle error here
        });
    }
    if (imgeTargetAction.type == 'update') {


      dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file })).unwrap()
        .then((res) => {
          let getRes = [...imgeDataTarget]
          console.log(imgeDataTarget)
          getRes.splice(imgeTargetAction.index, 1, res.data[0]);
          console.log(getRes)
          setImgeDataTarget(getRes)
          setImgeTargetAction({
            index: '',
            type: '',
          })
        })
        .catch((error) => {
          // console.log(error);
          // handle error here
        });

    }
    setImages(imageList);
  };
  useEffect(() => {
    if (imgeTargetAction.type == 'remove') {
      // console.log(imgeDataTarget)
      let getRes = imgeDataTarget.filter((el) => el !== imgeDataTarget[imgeTargetAction.index])
      // console.log(getRes)
      setImgeDataTarget(getRes)
      console.log(getRes)
      setImgeTargetAction({
        index: '',
        type: '',
      })
    }

  }, [imgeTargetAction, imgeDataTarget]);

  let handleSubmit = (e) => {
    e.preventDefault();


    let data = {
      name: {
        en: inputValue.category_Name_en,
        ar: inputValue.category_Name_ar,
        fr: inputValue.category_Name_fr
      },
      description: {
        en: inputValue.desc_en,
        ar: inputValue.desc_ar,
        fr: inputValue.desc_fr
      },
      price: inputValue.price,
      phone: inputValue.phone,
      category_id: targetIdSelect.categories,
      images: imgeDataTarget
    };
    // console.log(data)

    dispatch(AddServicesThunk(data))
      .unwrap()
      .then((data) => {
        // console.log(data);
        navigate("/admin/services");
      })
      .catch((error) => {
        // console.log(error);
        //    setCode(error.code);
      });
  };
  useEffect(() => {
    return () => {
      dispatch(closeError());
    };
  }, []);
  useEffect(() => {
    dispatch(closeError());
  }, [dispatch, inputValue]);

  return (
    <>
      <>
        <div className="p-[20px] mt-[40px]">
          <form
            action=""
            className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
            onSubmit={handleSubmit}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              sx={{ mb: "20px" }}
              className="justify-start"
            >
              <Tab
                label={t("Language.English")}
                className="!p-2"
              />
              <Tab
                label={t("Language.Arabic")}
                className="!p-2"
              />
              <Tab
                label={t("Language.French")}
                className="!p-2"
              />
            </Tabs>
            <hr className=" w-full my-[40px]" />
            <div className="flex justify-center flex-col lg:flex-row lg:items-start items-center w-full   gap-[30px] h-full">
              <>
                <div
                  className=" w-full "
                  style={{
                    display: value === 0 ? "block" : "none",
                  }}
                >
                  <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                    {t(
                      "pages.ServicesAdd.Sub_category_Name"
                    )}
                  </h6>

                  <input type="text"
                    value={inputValue.category_Name_en}
                    onChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        category_Name_en: e.target.value,
                      });
                    }} />
                  {name_Error_en !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {name_Error_en}
                    </span>
                  )}{" "}
                </div>
                <div
                  className=" w-full "
                  style={{
                    display: value === 1 ? "block" : "none",
                  }}
                >
                  <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                    {t(
                      "pages.ServicesAdd.Sub_category_Name"
                    )}
                  </h6>

                  <input type="text"
                    value={inputValue.category_Name_ar}
                    onChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        category_Name_ar: e.target.value,
                      });
                    }} />
                  {name_Error_ar !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {name_Error_ar}
                    </span>
                  )}{" "}
                </div>
                <div
                  className=" w-full "
                  style={{
                    display: value === 2 ? "block" : "none",
                  }}
                >
                  <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                    {t(
                      "pages.ServicesAdd.Sub_category_Name"
                    )}
                  </h6>

                  <input type="text"
                    value={inputValue.category_Name_fr}
                    onChange={(e) => {
                      setInputValue({
                        ...inputValue,
                        category_Name_fr: e.target.value,
                      });
                    }} />
                  {name_Error_fr !== null && (
                    <span
                      style={{
                        width: "100%",
                        color: "red",
                        fontSize: "15px",
                        marginBottom: "15px",
                        marginTop: "15px",
                        display: "block",
                      }}
                    >
                      {name_Error_fr}
                    </span>
                  )}{" "}
                </div>
              </>
              <div
                className=" w-full "
                style={{
                  display: value === 0 ? "block" : "none",
                }}
              >
                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                  {t("pages.ServicesAdd.Description")}
                </h6>
                <textarea className=" min-h-[150px]"
                  value={inputValue.desc_en}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      desc_en: e.target.value,
                    });
                  }}
                ></textarea>
                {desc_Error_en !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "15px",
                      marginTop: "15px",
                      display: "block",
                    }}
                  >
                    {desc_Error_en}
                  </span>
                )}{" "}
              </div>
              <div
                className=" w-full "
                style={{
                  display: value === 1 ? "block" : "none",
                }}
              >
                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                  {t("pages.ServicesAdd.Description")}
                </h6>
                <textarea className=" min-h-[150px]" value={inputValue.desc_ar}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      desc_ar: e.target.value,
                    });
                  }} ></textarea>
                {desc_Error_ar !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "15px",
                      marginTop: "15px",
                      display: "block",
                    }}
                  >
                    {desc_Error_ar}
                  </span>
                )}{" "}
              </div>
              <div
                className=" w-full "
                style={{
                  display: value === 2 ? "block" : "none",
                }}
              >
                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                  {t("pages.ServicesAdd.Description")}
                </h6>
                <textarea className=" min-h-[150px]" value={inputValue.desc_fr}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      desc_fr: e.target.value,
                    });
                  }}></textarea>
                {desc_Error_fr !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "15px",
                      marginTop: "15px",
                      display: "block",
                    }}
                  >
                    {desc_Error_fr}
                  </span>
                )}{" "}
              </div>
            </div>

            <hr className=" w-full my-[40px]" />

            <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
              <FormControl
                className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]"
                onClick={(e) => {
                  // console.log(e.target.textContent)
                  if (e.target.tagName == "LI") {
                    // console.log(e.target.textContent);
                    setSelectTarget({
                      ...selectTarget,
                      Main_Category: e.target.textContent,
                    });
                    let data = categoriesSelectData.filter(
                      (el) => el.name === e.target.textContent
                    );

                    setTargetIdSelect({
                      ...targetIdSelect,
                      categories: data[0].id,
                    });
                  }
                }}
              >
                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                  {t("pages.ServicesAdd.Categories")}
                </h6>
                <SelectBox TargetData={categoriesSelectData} />
                {category_id_Error !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "15px",
                      marginTop: "15px",
                      display: "block",
                    }}
                  >
                    {category_id_Error}
                  </span>
                )}{" "}
              </FormControl>
              <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                  {t("pages.ServicesAdd.Price")}
                </h6>
                <input type="text"
                  value={inputValue.price}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      price: e.target.value,
                    });
                  }} />
                {price_Error !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "15px",
                      marginTop: "15px",
                      display: "block",
                    }}
                  >
                    {price_Error}
                  </span>
                )}{" "}
              </FormControl>
              <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                  {t("pages.ServicesAdd.Phone_Number")}
                </h6>
                <input type="text"
                  value={inputValue.phone}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      phone: e.target.value,
                    });
                  }} />
                {phone_Error !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginBottom: "15px",
                      marginTop: "15px",
                      display: "block",
                    }}
                  >
                    {phone_Error}
                  </span>
                )}{" "}
              </FormControl>
            </div>

            <hr className=" w-full my-[40px]" />
            <div className=" w-full relative ">
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={"1000"}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className=" flex flex-col justify-end gap-[40px]  items-end">
                    <Button
                      variant="contained"
                      className=" !bg-primaryBg w-[150px] h-[50px] "
                      onClick={() => {
                        setImgeTargetAction({
                          index: '',
                          type: 'upload',
                        })
                        onImageUpload();
                      }}
                    >
                      {t("pages.ServicesAdd.ADD_Images")}
                    </Button>
                    <div className=" w-full flex flex-wrap gap-[30px] justify-center lg:justify-start items-start">
                      {imageList.length ? (
                        imageList.map(
                          (image, index) => (
                            <div
                              key={index}
                              className="image-item  w-full max-w-[300px] min-w-[200px] border p-3 border-primaryBg  relative "
                            >
                              <div className=" flex justify-between gap-5 items-center mb-3 ">
                                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                  {t(
                                    "pages.ServicesAdd.Img"
                                  )}{" "}
                                  :{index + 1}
                                </h6>
                                <IconButton
                                  aria-label=""
                                  onClick={() => {
                                    onImageRemove(
                                      index
                                    );
                                    setImgeTargetAction({
                                      index: index,
                                      type: 'remove',
                                    })
                                  }}
                                >
                                  <DeleteForever />
                                </IconButton>
                              </div>
                              <img
                                src={
                                  image[
                                  "data_url"
                                  ]
                                }
                                className=" rounded-[6px]  w-full cursor-pointer object-cover !aspect-square	"
                                alt=""

                                width="100"
                                onClick={() => {

                                  onImageUpdate(
                                    index
                                  );
                                  setImgeTargetAction({
                                    index: index,
                                    type: 'update',
                                  })
                                }}
                              />
                            </div>
                          )
                        )
                      ) : (
                        <div className="image-item  w-full max-h-[300px]">
                          <img
                            src={img}
                            className=" object-cover w-full max-h-[300px]"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </ImageUploading>
              {images_Error !== null && (
                <span
                  style={{
                    width: "100%",
                    color: "red",
                    fontSize: "15px",
                    marginBottom: "15px",
                    marginTop: "15px",
                    display: "block",
                  }}
                >
                  {images_Error}
                </span>
              )}
            </div>
            {/* ======================== */}
            <hr className=" w-full my-[40px]" />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
            >
              {t("pages.ServicesAdd.Submit")}
            </Button>
          </form>
        </div>
      </>
    </>
  );
};

export default React.memo(ServicesAdd);
