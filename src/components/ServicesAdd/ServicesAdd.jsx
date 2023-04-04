import { Button, FormControl } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, IconButton } from "@mui/material";
import "./ServicesAdd.css";
import SelectBox from "../SelectBox/SelectBox";
import img from "../../assets/Img/default.jpg";
import ImageUploading from "react-images-uploading";
import { DeleteForever } from "@mui/icons-material";
let selectData = ["name", "email", "pass"];
const ServicesAdd = () => {
    let { t, i18n } = useTranslation();
    const [value, setValue] = React.useState(0);
    const [images, setImages] = React.useState([]);

    // useEffect(() => {
    //   setImages([{ data_url: editData.img }])
    // }, [editData.img]);
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const [selectTarget, setSelectTarget] = React.useState({
        Categories: "",
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
    return (
        <>
            <>
                <div className="p-[20px] mt-[40px]">
                    <form
                        action=""
                        className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
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

                                    <input type="text" placeholder="Name" />
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

                                    <input type="text" placeholder="Name" />
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

                                    <input type="text" placeholder="Name" />
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
                                <textarea className=" min-h-[150px]"></textarea>
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
                                <textarea className=" min-h-[150px]"></textarea>
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
                                <textarea className=" min-h-[150px]"></textarea>
                            </div>
                        </div>

                        <hr className=" w-full my-[40px]" />

                        <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                            <FormControl
                                className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]"
                                onClick={(e) => {
                                    // console.log(e.target.textContent)
                                    setSelectTarget({
                                        ...selectTarget,
                                        Categories: e.target.textContent,
                                    });
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ServicesAdd.Categories")}
                                </h6>
                                <SelectBox selectData={selectData} />
                            </FormControl>
                            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ServicesAdd.Price")}
                                </h6>
                                <input type="text" />
                            </FormControl>
                            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[440px]">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ServicesAdd.Phone_Number")}
                                </h6>
                                <input type="text" />
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
                                                                    :{index + 1}{" "}
                                                                </h6>
                                                                <IconButton
                                                                    aria-label=""
                                                                    onClick={() => {
                                                                        onImageRemove(
                                                                            index
                                                                        );
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
                                                                {...dragProps}
                                                                width="100"
                                                                onClick={() =>
                                                                    onImageUpdate(
                                                                        index
                                                                    )
                                                                }
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
