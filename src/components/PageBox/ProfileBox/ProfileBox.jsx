import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    Typography,
} from "@mui/material";
import {
    AddAPhoto,
    Shortcut,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import "./ProfileBox.css";
import img from "../../../assets/Img/default.jpg";
import ImageUploading from "react-images-uploading";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OneProfileThunk } from "../../../RTK/Thunk/OneProfileThunk";
import { UpdateProfileThunk } from "../../../RTK/Thunk/UpdateProfileThunk";
import { closeError } from "../../../RTK/Reducers/ProfileReducer";

const ProfileBox = () => {
    let { t, i18n } = useTranslation();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    let {
        avatar,
        userData,
        nameError,
        emailError,
        passwordError,
        avatarError,
    } = useSelector((state) => state.ProfileReducer);
    const [inputValue, setInputValue] = React.useState({
        input_name: "",
        input_email: "",
        input_pass: "",
        input_con_pass: "",
    });
    const handleClickShowPassword = useCallback(() => {
        setShowPassword((show) => !show);
    }, []);
    const handleMouseDownPassword = useCallback((event) => {
        event.preventDefault();
    }, []);
    const [images, setImages] = React.useState([{ data_url: img }]);

    // useEffect(() => {
    //   setImages([{ data_url: editData.img }])
    // }, [editData.img]);
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    // ============= handle get data user================
    useEffect(() => {
        dispatch(OneProfileThunk());
    }, [dispatch]);
    // get data
    useEffect(() => {
        if (userData) {
            setInputValue({
                input_name: userData?.name,
                input_email: userData?.email,
                input_pass: "",
                input_con_pass: "",
            });
        }
    }, [userData]);
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
    // handle img value on loading
    useEffect(() => {
        if (avatar) {
            // console.log(oneImg);
            setImages([{ data_url: avatar }]);
        }
    }, [avatar]);
    // handle img fil value on change
    useEffect(() => {
        if (images[0].data_url !== img && images[0].data_url !== avatar) {
            convertImage(images[0].data_url);
        }
    }, [images, avatar]);
    // handle submit
    useEffect(() => {
        dispatch(closeError());
        return () => {
            dispatch(closeError());
        };
    }, [inputValue, dispatch]);
    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UpdateProfileThunk({
                name: inputValue.input_name,
                email: inputValue.input_email,
                password_confirmation: inputValue.input_con_pass,
                password: inputValue.input_pass,
                avatar: imageFile,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
            })
            .catch((error) => {
                // console.log(error);
                //    setCode(error.code);
            });
    };
    return (
        <>
            <div className="p-[20px] mt-[60px]">
                <form
                    action=""
                    className="add-box flex  relative items-start justify-start flex-col px-5 pb-[60px] pt-[130px]  mb-[40px] add-shadow  "
                    onSubmit={handleSubmit}
                >
                    <div className=" flex  w-full gap-[30px] justify-center items-center flex-col lg:flex-row">
                        <div className=" min-w-[250px] gap-[20px] flex   flex-col justify-center items-center  w-full lg:max-w-[500px]">
                            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.Profile.Full_Name")}
                                </h6>
                                <input
                                    type="text"
                                    value={inputValue?.input_name}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_name: e.target.value,
                                        });
                                    }}
                                />
                                {nameError !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "10px",
                                            display: "block",
                                        }}
                                    >
                                        {nameError}
                                    </span>
                                )}
                            </FormControl>
                            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.Profile.Email")}
                                </h6>
                                <input
                                    type="email"
                                    value={inputValue?.input_email}
                                    onChange={(e) => {
                                        setInputValue({
                                            ...inputValue,
                                            input_email: e.target.value,
                                        });
                                    }}
                                />{" "}
                                {emailError !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "10px",
                                            display: "block",
                                        }}
                                    >
                                        {emailError}
                                    </span>
                                )}
                            </FormControl>
                        </div>

                        <div className=" min-w-[250px]  gap-[20px] flex   flex-col justify-center items-center w-full lg:max-w-[500px]">
                            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.Profile.New_Password")}
                                </h6>
                                <FormControl
                                    variant="standard"
                                    fullWidth
                                    className="input-box"
                                >
                                    <Input
                                        id="standard-adornment-password"
                                        className="input-pass"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="pass"
                                        value={inputValue?.input_pass}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                input_pass: e.target.value,
                                            });
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    disableRipple
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {passwordError !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "10px",
                                            display: "block",
                                        }}
                                    >
                                        {passwordError}
                                    </span>
                                )}
                            </FormControl>
                            <FormControl className="min-h-[75.5px] min-w-[250px] w-full lg:max-w-[500px]">
                                <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                    {t("pages.Profile.Confirm_Password")}
                                </h6>
                                <FormControl
                                    variant="standard"
                                    fullWidth
                                    className="input-box"
                                >
                                    <Input
                                        id="standard-adornment-password"
                                        className="input-pass"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={inputValue?.input_con_pass}
                                        onChange={(e) => {
                                            setInputValue({
                                                ...inputValue,
                                                input_con_pass: e.target.value,
                                            });
                                        }}
                                        name="pass"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    disableRipple
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {passwordError !== null && (
                                    <span
                                        style={{
                                            width: "100%",
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "10px",
                                            display: "block",
                                        }}
                                    >
                                        {passwordError}
                                    </span>
                                )}
                            </FormControl>
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[150px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.Profile.Save_Change")}
                    </Button>
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
                                            className=" cursor-pointer bg-white w-[150px] img-shadow  h-[150px] absolute top-[-75px] left-[50%] translate-x-[-50%] rounded-full overflow-hidden"
                                            key={index}
                                        >
                                            <img
                                                src={image["data_url"]}
                                                className="w-full h-full object-cover"
                                                alt=""
                                                onClick={() =>
                                                    onImageUpdate(index)
                                                }
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        </ImageUploading>
                    </>
                    <hr className=" w-full my-[40px]" />
                </form>
            </div>
        </>
    );
};

export default ProfileBox;
