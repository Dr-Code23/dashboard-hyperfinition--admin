import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, IconButton } from "@mui/material";
import "./ProductEdit.css";
import SelectBox from "../SelectBox/SelectBox";
import img from "../../assets/Img/default.jpg";
import ImageUploading from "react-images-uploading";
import { DeleteForever } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { SelectAllCategoriesThunk } from "../../RTK/Thunk/SelectAllCategoriesThunk";
import { SelectBrandThunk } from "../../RTK/Thunk/SelectBrandThunk";
import { SelectUnitThunk } from "../../RTK/Thunk/SelectUnitThunk";
import { SelectAttributesThunk } from "../../RTK/Thunk/SelectAttributesThunk";
import { useNavigate, useParams } from "react-router-dom";
import { OneProductThunk } from "../../RTK/Thunk/OneProductThunk";
import { UploadImgThunk } from "../../RTK/Thunk/uploadImgThunk";
import { DataView, closeError } from "../../RTK/Reducers/ProductReducer";
import { UpdateProductThunk } from "../../RTK/Thunk/UpdateProductThunk";
import { openMessageAlert } from "../../RTK/Reducers/MessageReducer";
let selectData = ["name", "email", "pass"];
const ProductEdit = () => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();
    let param = useParams();

    let navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [images, setImages] = React.useState([]);

    const [imgeDataTarget, setImgeDataTarget] = useState([]);
    const [imgeTargetAction, setImgeTargetAction] = useState({
        index: "",
        type: "",
    });
    const [selectTarget, setSelectTarget] = React.useState({
        Brand: "",
        Attributes: "",
        Categories: "",
        Sub_Categories: "",
        Sub_Sub_Categories: "",
        Unit: "",
    });
    const [inputValue, setInputValue] = useState({
        category_Name_en: "",
        category_Name_ar: "",
        category_Name_fr: "",
        desc_en: "",
        desc_ar: "",
        desc_fr: "",
        price: "",
        total: "",
    });
    const [targetIdSelect, setTargetIdSelect] = React.useState({
        categories: "",
        brand: "",
        attribute: "",
        unit: "",
    });
    const [selectIndex, setSelectIndex] = React.useState({
        categories: "",
        brand: "",
        attribute: "",
        unit: "",
    });

    let {
        unitSelectData,
        attributesSelectData,
        brandSelectData,
        categoriesSelectData,
        oneImgData,
        oneDataProduct,
        price_Error,
        phone_Error,
        category_id_Error,
        brand_id_Error,
        unit_id_Error,
        att_id_Error,
        images_Error,
        name_Error_en,
        name_Error_ar,
        name_Error_fr,
        desc_Error_en,
        desc_Error_ar,
        desc_Error_fr,
    } = useSelector((state) => state.ProductReducer);

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
    const dataRef = useRef(true);
    useEffect(() => {
        if (dataRef.current) {
            dispatch(SelectAllCategoriesThunk());
            dispatch(SelectBrandThunk());
            dispatch(SelectUnitThunk());
            dispatch(SelectAttributesThunk());
            dataRef.current = false;
        }
    }, [dispatch]);
    // =============
    // useEffect(() => {
    //     if (categoriesSelectData.length < 1) {
    //         dispatch(SelectAllCategoriesThunk());
    //     }
    // }, [dispatch, categoriesSelectData.length]);
    // useEffect(() => {
    //     if (brandSelectData.length < 1) {
    //         dispatch(SelectBrandThunk());
    //     }
    // }, [dispatch, brandSelectData.length]);
    // useEffect(() => {
    //     if (unitSelectData.length < 1) {
    //         dispatch(SelectUnitThunk());
    //     }
    // }, [dispatch, unitSelectData.length]);
    // useEffect(() => {
    //     if (attributesSelectData.length < 1) {
    //         dispatch(SelectAttributesThunk());
    //     }
    // }, [dispatch, attributesSelectData.length]);
    const OneRef = useRef(true);
    useEffect(() => {
        if (oneDataProduct == "" && OneRef.current) {
            dispatch(OneProductThunk({ id: param.productEdit }));
            OneRef.current = false;
        }
    }, [dispatch, param.productEdit, oneDataProduct]);
    // handle select on loading

    useEffect(() => {
        if (targetIdSelect.categories == "" && categoriesSelectData.length) {
            if (oneDataProduct?.category_id) {
                let data = categoriesSelectData.findIndex(
                    (el) => el.id == oneDataProduct?.category_id
                );
                setSelectIndex({ ...selectIndex, categories: data });
                setTargetIdSelect({
                    ...targetIdSelect,
                    categories: categoriesSelectData[data]?.id,
                });
            }
        }
    }, [
        categoriesSelectData,
        targetIdSelect,
        oneDataProduct?.category_id,
        selectIndex,
    ]);
    useEffect(() => {
        if (targetIdSelect.brand == "" && brandSelectData.length) {
            if (oneDataProduct?.brand_id) {
                let data = brandSelectData.findIndex(
                    (el) => el.id == oneDataProduct?.brand_id
                );
                setSelectIndex({ ...selectIndex, brand: data });
                setTargetIdSelect({
                    ...targetIdSelect,
                    brand: brandSelectData[data]?.id,
                });
            }
        }
    }, [
        brandSelectData,
        targetIdSelect,
        oneDataProduct?.brand_id,
        selectIndex,
    ]);
    useEffect(() => {
        if (targetIdSelect.attribute == "" && attributesSelectData.length) {
            if (oneDataProduct?.attribute_id) {
                let data = attributesSelectData.findIndex(
                    (el) => el.id == oneDataProduct?.attribute_id
                );
                setSelectIndex({ ...selectIndex, attribute: data });
                setTargetIdSelect({
                    ...targetIdSelect,
                    attribute: attributesSelectData[data]?.id,
                });
            }
        }
    }, [
        attributesSelectData,
        targetIdSelect,
        oneDataProduct?.attribute_id,
        selectIndex,
    ]);
    useEffect(() => {
        if (targetIdSelect.unit == "" && unitSelectData.length) {
            if (oneDataProduct?.unit_id) {
                let data = unitSelectData.findIndex(
                    (el) => el.id == oneDataProduct?.unit_id
                );
                setSelectIndex({ ...selectIndex, unit: data });
                setTargetIdSelect({
                    ...targetIdSelect,
                    unit: unitSelectData[data]?.id,
                });
            }
        }
    }, [unitSelectData, targetIdSelect, oneDataProduct?.unit_id, selectIndex]);
    // OneProductThunk
    // handle input on loading
    useEffect(() => {
        if (oneDataProduct !== null) {
            setInputValue({
                category_Name_en: oneDataProduct.name?.en,
                category_Name_ar: oneDataProduct.name?.ar,
                category_Name_fr: oneDataProduct.name?.fr,
                desc_en: oneDataProduct.description?.en,
                desc_ar: oneDataProduct.description?.ar,
                desc_fr: oneDataProduct.description?.fr,
                price: oneDataProduct?.unit_price,
                total: oneDataProduct?.quantity,
            });
        }
    }, [oneDataProduct]);

    /// handle img all
    const onChange = (imageList, addUpdateIndex) => {
        if (imgeTargetAction.type == "upload") {
            dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file }))
                .unwrap()
                .then((res) => {
                    // console.log(res.data[0]);
                    let getRes = [...imgeDataTarget];
                    getRes.push(res.data[0]);
                    // console.log(getRes)
                    setImgeDataTarget(getRes);
                    setImgeTargetAction({
                        index: "",
                        type: "",
                    });
                })
                .catch((error) => {
                    // console.log(error);
                    // handle error here
                });
        }
        if (imgeTargetAction.type == "update") {
            dispatch(UploadImgThunk({ img: imageList[addUpdateIndex]?.file }))
                .unwrap()
                .then((res) => {
                    let getRes = [...imgeDataTarget];
                    // getRes.splice(imgeTargetAction.index, 1, res.data[0]);
                    getRes[imgeTargetAction.index] = res.data[0];
                    setImgeDataTarget(getRes);
                    // console.log(getRes)
                    setImgeTargetAction({
                        index: "",
                        type: "",
                    });
                })
                .catch((error) => {
                    // handle error here
                });
        }
        setImages(imageList);
    };
    const RefImg = useRef(true);
    useEffect(() => {
        if (oneImgData.length && images.length < 1 && RefImg.current) {
            let dataGet = [...oneImgData];
            let data = [];
            for (let index = 0; index < oneImgData.length; index++) {
                data.push("");
            }
            setImgeDataTarget(data);

            let dataString = ImageToString(oneImgData);

            dataGet = dataGet.map((el, index) => {
                return {
                    data_url: el,
                    key: dataString[index],
                };
            });
            setImages(dataGet);
            RefImg.current = false;
        }
    }, [oneImgData, images]);
    let ImageToString = (imagesFromApi) => {
        let index;
        let keptImages = [];
        for (index in imagesFromApi) {
            /*
            Split The Url Of Image Ang Get Only Image Name

            example: if Url Of Image is => http://api.abdjan/storage/default/default.png

            if will get only => default.png
        */

            let splitedImage = imagesFromApi[index].split("/");

            keptImages.push(splitedImage[splitedImage.length - 1] || null);
        }
        return keptImages;
    };

    useEffect(() => {
        if (imgeTargetAction.type == "remove") {
            let getRes = [...imgeDataTarget];
            getRes.splice(imgeTargetAction.index, 1);

            setImgeDataTarget(getRes);
            setImgeTargetAction({
                index: "",
                type: "",
            });
        }
    }, [imgeTargetAction, imgeDataTarget]);

    useEffect(() => {
        return () => {
            dispatch(closeError());
            dispatch(DataView());
        };
    }, []);

    useEffect(() => {
        dispatch(closeError());
    }, [dispatch, inputValue]);

    let handleSubmit = (e) => {
        e.preventDefault();
        let handleKeepImg = () => {
            let data = [...images];
            data = data.map((el) => {
                if (el?.key) {
                    return el;
                }
            });
            data = data.filter((el) => el?.key);
            data = data.map((el) => {
                return el.key;
            });
            return data;
        };
        let handleImg = () => {
            let data = [...imgeDataTarget];

            data = data.filter((el) => el !== "");

            return data;
        };

        let data = {
            id: param.productEdit,
            name: {
                en: inputValue.category_Name_en,
                ar: inputValue.category_Name_ar,
                fr: inputValue.category_Name_fr,
            },
            description: {
                en: inputValue.desc_en,
                ar: inputValue.desc_ar,
                fr: inputValue.desc_fr,
            },
            unit_price: inputValue.price,
            quantity: inputValue.total,
            category_id: targetIdSelect.categories,
            attribute_id: targetIdSelect.attribute,
            unit_id: targetIdSelect.unit,
            brand_id: targetIdSelect.brand,
            images: handleImg(),
            keep_images: handleKeepImg(),
        };
        // console.log(data)

        dispatch(UpdateProductThunk(data))
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(openMessageAlert());

                navigate("/admin/product");
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    // console.log(imgeDataTarget)
    // console.log(images)
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
                                            "pages.ProductNew.Sub_category_Name"
                                        )}
                                    </h6>
                                    <input
                                        type="text"
                                        value={inputValue.category_Name_en}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                category_Name_en:
                                                    e.target.value,
                                            });
                                        }}
                                    />
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
                                            "pages.ProductNew.Sub_category_Name"
                                        )}
                                    </h6>
                                    <input
                                        type="text"
                                        value={inputValue.category_Name_ar}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                category_Name_ar:
                                                    e.target.value,
                                            });
                                        }}
                                    />
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
                                            "pages.ProductNew.Sub_category_Name"
                                        )}
                                    </h6>
                                    <input
                                        type="text"
                                        value={inputValue.category_Name_fr}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                category_Name_fr:
                                                    e.target.value,
                                            });
                                        }}
                                    />
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
                                    {t("pages.ProductNew.Description")}
                                </h6>
                                <textarea
                                    className=" min-h-[150px]"
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
                                    {t("pages.ProductNew.Description")}
                                </h6>
                                <textarea
                                    className=" min-h-[150px]"
                                    value={inputValue.desc_ar}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            desc_ar: e.target.value,
                                        });
                                    }}
                                ></textarea>
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
                                    {t("pages.ProductNew.Description")}
                                </h6>
                                <textarea
                                    className=" min-h-[150px]"
                                    value={inputValue.desc_fr}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            desc_fr: e.target.value,
                                        });
                                    }}
                                ></textarea>
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
                                className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                onClick={(e) => {
                                    // console.log(e.target.textContent)
                                    if (e.target.tagName == "LI") {
                                        // console.log(e.target.textContent);
                                        setSelectTarget({
                                            ...selectTarget,
                                            Main_Category: e.target.textContent,
                                        });
                                        let data = categoriesSelectData.filter(
                                            (el) =>
                                                el.name === e.target.textContent
                                        );

                                        setTargetIdSelect({
                                            ...targetIdSelect,
                                            categories: data[0].id,
                                        });
                                    }
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Categories")}
                                </h6>
                                <SelectBox
                                    TargetData={categoriesSelectData}
                                    selectIndex={selectIndex.categories}
                                />
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
                                )}
                            </FormControl>
                            <FormControl
                                className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                onClick={(e) => {
                                    // console.log(e.target.textContent)

                                    if (e.target.tagName == "LI") {
                                        // console.log(e.target.textContent);
                                        setSelectTarget({
                                            ...selectTarget,
                                            Brand: e.target.textContent,
                                        });
                                        let data = brandSelectData.filter(
                                            (el) =>
                                                el.name === e.target.textContent
                                        );

                                        setTargetIdSelect({
                                            ...targetIdSelect,
                                            brand: data[0].id,
                                        });
                                    }
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Brand")}
                                </h6>
                                <SelectBox
                                    TargetData={brandSelectData}
                                    selectIndex={selectIndex.brand}
                                />
                                {brand_id_Error !== null && (
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
                                        {brand_id_Error}
                                    </span>
                                )}{" "}
                            </FormControl>
                            <FormControl
                                className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                onClick={(e) => {
                                    // console.log(e.target.textContent)

                                    if (e.target.tagName == "LI") {
                                        // console.log(e.target.textContent);
                                        setSelectTarget({
                                            ...selectTarget,
                                            Attributes: e.target.textContent,
                                        });
                                        let data = attributesSelectData.filter(
                                            (el) =>
                                                el.name === e.target.textContent
                                        );

                                        setTargetIdSelect({
                                            ...targetIdSelect,
                                            attribute: data[0].id,
                                        });
                                    }
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Attributes")}
                                </h6>
                                <SelectBox
                                    TargetData={attributesSelectData}
                                    selectIndex={selectIndex.attribute}
                                />
                                {att_id_Error !== null && (
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
                                        {att_id_Error}
                                    </span>
                                )}{" "}
                            </FormControl>
                            <FormControl
                                className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[340px]"
                                onClick={(e) => {
                                    // console.log(e.target.textContent)

                                    if (e.target.tagName == "LI") {
                                        // console.log(e.target.textContent);
                                        setSelectTarget({
                                            ...selectTarget,
                                            Unit: e.target.textContent,
                                        });
                                        let data = unitSelectData.filter(
                                            (el) =>
                                                el.name === e.target.textContent
                                        );

                                        setTargetIdSelect({
                                            ...targetIdSelect,
                                            unit: data[0].id,
                                        });
                                    }
                                }}
                            >
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Unit")}
                                </h6>
                                <SelectBox
                                    TargetData={unitSelectData}
                                    selectIndex={selectIndex.unit}
                                />
                                {unit_id_Error !== null && (
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
                                        {unit_id_Error}
                                    </span>
                                )}{" "}
                            </FormControl>
                        </div>
                        <hr className=" w-full my-[40px]" />
                        <div className=" w-full flex gap-[30px] md:flex-row flex-col  ">
                            <div className=" w-full ">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Unit_Price")}
                                </h6>
                                <input
                                    type="text"
                                    value={inputValue.price}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            price: e.target.value,
                                        });
                                    }}
                                />
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
                            </div>
                            <div className=" w-full ">
                                <h6 className=" text-[17px] mb-3 font-[500] capitalize  ">
                                    {t("pages.ProductNew.Total_Quantity")}
                                </h6>
                                <input
                                    type="text"
                                    value={inputValue.total}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            total: e.target.value,
                                        });
                                    }}
                                />
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
                            </div>
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
                                                    index: "",
                                                    type: "upload",
                                                });
                                                onImageUpload();
                                            }}
                                        >
                                            {t("pages.ServicesEdit.ADD_Images")}
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
                                                                        "pages.ServicesEdit.Img"
                                                                    )}{" "}
                                                                    :{index + 1}
                                                                </h6>
                                                                <IconButton
                                                                    aria-label=""
                                                                    onClick={() => {
                                                                        setImgeTargetAction(
                                                                            {
                                                                                index: index,
                                                                                type: "remove",
                                                                            }
                                                                        );
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
                                                                width="100"
                                                                onClick={() => {
                                                                    onImageUpdate(
                                                                        index
                                                                    );
                                                                    setImgeTargetAction(
                                                                        {
                                                                            index: index,
                                                                            type: "update",
                                                                        }
                                                                    );
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
                            {t("pages.ProductEdit.Submit")}
                        </Button>
                    </form>
                </div>
            </>
        </>
    );
};

export default React.memo(ProductEdit);
