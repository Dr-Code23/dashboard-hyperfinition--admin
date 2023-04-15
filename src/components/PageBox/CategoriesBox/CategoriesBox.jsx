import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoriesBox.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Avatar, Button, Tab, Tabs } from "@mui/material";
import ImageUploading from "react-images-uploading";
import img from "../../../assets/Img/default.jpg";
import { PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import SwitchBox from "../../SwitchBox/SwitchBox";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AllCategoriesThunk } from "../../../RTK/Thunk/AllCategoriesThunk";
import { AddCategoriesThunk } from "../../../RTK/Thunk/AddCategoriesThunk";
import { closeError } from "../../../RTK/Reducers/CategoriesReducer";
import { DeleteCategoriesThunk } from "../../../RTK/Thunk/DeleteCategoriesThunk";
import { CategoriesStatusThunk } from "../../../RTK/Thunk/CategoriesStatusThunk";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CategoriesBox = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let { t, i18n } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [pageTarget, setPageTarget] = useState(1);
  const [images, setImages] = React.useState([{ data_url: img }]);
  let {
    categoriesData,
    lastPage,
    avatarError,
    name_en_Error,
    name_ar_Error,
    name_fr_Error,
  } = useSelector((state) => state.CategoriesReducer);
  const [inputValue, setInputValue] = React.useState({
    input_en: "",
    input_ar: "",
    input_fr: "",
  });

  //handle input language
  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);
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
  const onChange = (imageList, addUpdateIndex) => {
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    if (searchValue) {
      dispatch(AllCategoriesThunk({ page: pageTarget, search: searchValue }));

    }
    else {
      dispatch(AllCategoriesThunk({ page: pageTarget, search: '' }));

    }
  }, [dispatch, pageTarget, i18n.language, searchValue]);

  //  handle add table
  // ========== convertImg===============
  const [imageFile, setImageFile] = useState(null);
  let convertImage = async (imageUrl) => {
    if (imageUrl) {
      let response = await fetch(imageUrl || "", {
        mode: "no-cors",
      });
      let blob = await response.blob();

      let file = new File([blob], "image.jpg", { type: "image/jpeg" });
      setImageFile(file);
    }

    // =========
  };
  useEffect(() => {
    if (images[0].data_url !== img) {
      dispatch(closeError({ type: "img" }));
      convertImage(images[0].data_url);
    }
  }, [images, dispatch]);

  // handle error input
  // =====en=======
  useEffect(() => {
    if (inputValue.input_en) {
      dispatch(closeError({ type: "en" }));
    }
  }, [inputValue.input_en, dispatch]);
  // =====ar=======
  useEffect(() => {
    if (inputValue.input_ar) {
      dispatch(closeError({ type: "ar" }));
    }
  }, [inputValue.input_ar, dispatch]);
  // =====fr=======

  useEffect(() => {
    if (inputValue.input_fr) {
      dispatch(closeError({ type: "fr" }));
    }
  }, [inputValue.input_fr, dispatch]);

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      AddCategoriesThunk({
        // id: nameBrand?.id,
        ar: inputValue?.input_ar,
        en: inputValue?.input_en,
        fr: inputValue?.input_fr,
        img: imageFile,
      })
    )
      .unwrap()
      .then((data) => {
        // console.log(data);
        dispatch(AllCategoriesThunk({ page: pageTarget }));
        setInputValue({
          input_en: "",
          input_ar: "",
          input_fr: "",
        });
        setImages([{ data_url: img }]);
        setImageFile(null);
      })
      .catch((error) => {
        // console.log(error);
        // setCode(error.code);
        // handle error here
      });
  };
  // handle Delete Category
  let handleDeleteCategories = (id) => {
    dispatch(
      DeleteCategoriesThunk({
        id: id,
      })
    )
      .unwrap()
      .then((data) => {
        // console.log(data);
        dispatch(AllCategoriesThunk({ page: pageTarget }));
      })
      .catch((error) => {
        // console.log(error);
        // handle error here
      });
  };
  return (
    <>
      <div className=" mx-auto px-4  mt-[40px] mb-[160px] ">
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
            <Tab label={t("Language.English")} className="!p-2" />
            <Tab label={t("Language.Arabic")} className="!p-2" />
            <Tab label={t("Language.French")} className="!p-2" />
          </Tabs>
          <hr className=" w-full my-[20px]" />
          <div className="flex justify-center flex-col lg:flex-row items-center w-full  gap-5 h-full">
            <>
              <div
                className=" w-full mb-3"
                style={{
                  display: value === 0 ? "block" : "none",
                }}
              >
                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                  {t("pages.CategoriesBox.add.name")}
                </h6>
                <input
                  type="text"
                  value={inputValue?.input_en}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      input_en: e.target.value,
                    });
                  }}
                />
                {name_en_Error !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginTop: "20px",
                      display: "block",
                    }}
                  >
                    {name_en_Error}
                  </span>
                )}
              </div>
              <div
                className=" w-full mb-3"
                style={{
                  display: value === 1 ? "block" : "none",
                }}
              >
                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                  {t("pages.CategoriesBox.add.name")}
                </h6>
                <input
                  type="text"
                  value={inputValue?.input_ar}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      input_ar: e.target.value,
                    });
                  }}
                />
                {name_ar_Error !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginTop: "20px",
                      display: "block",
                    }}
                  >
                    {name_ar_Error}
                  </span>
                )}
              </div>
              <div
                className=" w-full mb-3"
                style={{
                  display: value === 2 ? "block" : "none",
                }}
              >
                <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                  {t("pages.CategoriesBox.add.name")}
                </h6>

                <input
                  type="text"
                  value={inputValue?.input_fr}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      input_fr: e.target.value,
                    });
                  }}
                />
                {name_fr_Error !== null && (
                  <span
                    style={{
                      width: "100%",
                      color: "red",
                      fontSize: "15px",
                      marginTop: "20px",
                      display: "block",
                    }}
                  >
                    {name_fr_Error}
                  </span>
                )}
              </div>
            </>
            <>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={"1"}
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
                  <>
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="image-item  w-full flex flex-col  items-start "
                      >
                        <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                          {t(
                            "pages.CategoriesBox.add.Images"
                          )}
                        </h6>
                        <img
                          src={image["data_url"]}
                          className="  min-w-[200px] w-full max-w-[500px] max-h-[280px]  rounded-[6px] sm:w-full cursor-pointer object-cover"
                          alt=""
                          {...dragProps}
                          style={
                            isDragging
                              ? {
                                border: "4px dashed #1da231",
                              }
                              : undefined
                          }
                          width="100"
                          onClick={() =>
                            onImageUpdate(index)
                          }
                        />
                        {avatarError !== null && (
                          <span
                            style={{
                              width: "100%",
                              color: "red",
                              fontSize: "15px",
                              marginTop: "20px",
                            }}
                          >
                            {avatarError}
                          </span>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </ImageUploading>
            </>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-5 !ml-auto"
          >
            {t("pages.CategoriesBox.add.Submit")}
          </Button>
        </form>
        <div className=" w-full flex justify-start  items-end my-[20px]">
          <div className='flex  items-end gap-2 pl-1'>
            <h6 className=' capitalize text-[22px]  font-medium	'>{t("pages.BrandBox.search")} :</h6>
            <input type="text" className=' bg-secondaryBg outline-none p-[8px]' value={searchValue} onChange={(e) => {

              setSearchValue(e.target.value)
            }

            } />
          </div>
        </div>
        {categoriesData.length && (
          <TableContainer component={Paper} sx={{ height: "438px" }}>
            <Table
              sx={{ minWidth: 700 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.CategoriesBox.table.id")}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.CategoriesBox.table.Name")}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.CategoriesBox.table.Img")}
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t(
                      "pages.CategoriesBox.table.Home_Status"
                    )}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="!bg-primaryBg capitalize"
                  >
                    {t("pages.CategoriesBox.table.actions")}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesData.map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Avatar
                        alt="Travis Howard"
                        className=" mx-auto"
                        src={row.img}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div
                        data-name={row.status}
                        onClick={(e) => {
                          if (
                            e.currentTarget.dataset
                              .name == "true"
                          ) {
                            dispatch(
                              CategoriesStatusThunk(
                                {
                                  id: row.id,
                                  status: false,
                                }
                              )
                            );
                            e.currentTarget.dataset.name = false;
                          } else {
                            dispatch(
                              CategoriesStatusThunk(
                                {
                                  id: row.id,
                                  status: true,
                                }
                              )
                            );
                            e.currentTarget.dataset.name = true;
                          }
                        }}
                      >
                        <SwitchBox
                          status={row.status}
                        />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="action flex items-center justify-center gap-2">
                        <IconButton
                          id="basic-button"
                          onClick={() => {
                            navigate(
                              `/admin/categories/edit/${row.id}`
                            );
                          }}
                        >
                          <ModeEdit />
                        </IconButton>
                        <IconButton
                          aria-label=""
                          onClick={() => {
                            handleDeleteCategories(
                              row.id
                            );
                          }}
                        >
                          <DeleteForever />
                        </IconButton>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
      </div>
    </>
  );
};

export default React.memo(CategoriesBox);
