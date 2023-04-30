import React, { useCallback, useEffect, useState } from "react";
import img from "../../../assets/Img/default.jpg";
import ImageUploading from "react-images-uploading";
import "./UserAddBox.css";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Shortcut, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { RolesDataThunk } from "../../../RTK/Thunk/RolesDataThunk";
import { useDispatch, useSelector } from "react-redux";
import { AddUserThunk } from "../../../RTK/Thunk/AddUserThunk";
import { closeError } from "../../../RTK/Reducers/UserReducer";
import { openAlert } from "../../../RTK/Reducers/MessageReducer";

const UserAddBox = () => {
    let { t, i18n } = useTranslation();
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email(t("pages.UserDetailBox.must_be_a_valid_email"))
            .required(t("pages.UserDetailBox.Required")),

        pass: Yup.string().required(t("pages.UserDetailBox.Required")),
        ConPass: Yup.string().required(t("pages.UserDetailBox.Required")),
        Name: Yup.string().required(t("pages.UserDetailBox.Required")),
    });
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showErrorForm, setShowErrorForm] = React.useState(false);
    const [images, setImages] = React.useState([{ data_url: img }]);
    let {
        roleData,
        nameError,
        emailError,
        passwordError,
        role_idError,
        avatarError,
    } = useSelector((state) => state.UserReducer);
    // = img==
    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const [age, setAge] = React.useState("");

    const handleClickShowPassword = useCallback(() => {
        setShowPassword((show) => !show);
    }, []);
    const handleMouseDownPassword = useCallback((event) => {
        event.preventDefault();
    }, []);
    const handleChange = useCallback((event) => {
        setAge(event.target.value);
    }, []);
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
            convertImage(images[0].data_url);
        }
    }, [images]);

    // fun handel validation
    const formik = useFormik({
        initialValues: {
            Name: "",
            email: "",
            pass: "",
            ConPass: "",
        },
        onSubmit: (values) => {
            dispatch(
                AddUserThunk({
                    name: values.Name,
                    email: values.email,
                    password: values.pass,
                    password_confirmation: values.ConPass,
                    role_id: age,
                    avatar: imageFile,
                })
            )
                .unwrap()
                .then((data) => {
                    // console.log(data);
                    dispatch(openAlert());

                    setImages([{ data_url: img }]);
                    navigate("/admin/users/");
                    dispatch(closeError());
                })
                .catch((error) => {
                    // console.log(error);
                    //    setCode(error.code);
                });
        },
        validationSchema: SignupSchema,
    });
    // handle roles data
    useEffect(() => {
        dispatch(RolesDataThunk());
    }, [dispatch]);

    useEffect(() => {
        dispatch(closeError());
        return () => {
            dispatch(closeError());
        };
    }, [formik.values, dispatch]);

    return (
        <>
            <div className="user-detail container">
                <IconButton
                    aria-label=""
                    size="large"
                    onClick={() => {
                        navigate("/admin/users/");
                    }}
                    className="close-modal"
                >
                    <Shortcut className=" !text-white" />
                </IconButton>
                <Typography
                    component={"form"}
                    className={"box"}
                    onSubmit={formik.handleSubmit}
                >
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
                                            className="image-item  w-full"
                                        >
                                            <h6 className="mb-[10px] text-[17px] font-[500] capitalize  ">
                                                {t("pages.BrandModal.Images")}
                                            </h6>
                                            <img
                                                src={image["data_url"]}
                                                className="  max-h-[280px] mx-[auto] rounded-[6px] sm:w-full cursor-pointer object-cover"
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
                                        </div>
                                    ))}
                                </>
                            )}
                        </ImageUploading>
                        {avatarError !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {avatarError}
                            </span>
                        )}
                    </>
                    <Typography
                        variant="body1"
                        component={"div"}
                        className="content-box"
                        sx={{ width: "100%" }}
                    >
                        <h5>{t("pages.UserDetailBox.Name")}</h5>
                        <TextField
                            sx={{ width: "100%" }}
                            id="outlined-basic"
                            className="input-box"
                            variant="standard"
                            name="Name"
                            onChange={formik.handleChange}
                            value={formik.values.Name}
                        />
                        {nameError !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {nameError}
                            </span>
                        )}
                        {formik.errors.Name && formik.touched.Name ? (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {formik.errors.Name}
                            </span>
                        ) : null}
                    </Typography>
                    <Typography
                        variant="body1"
                        component={"div"}
                        className="content-box"
                        sx={{ width: "100%" }}
                    >
                        <h5> {t("pages.UserDetailBox.Email")}</h5>
                        <TextField
                            sx={{ width: "100%" }}
                            id="outlined-basic"
                            className="input-box"
                            variant="standard"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {emailError !== null ? (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {emailError}
                            </span>
                        ) : formik.errors.email && formik.touched.email ? (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {formik.errors.email}
                            </span>
                        ) : null}
                    </Typography>
                    <Typography
                        variant="body1"
                        component={"div"}
                        className="content-box"
                        sx={{ width: "100%" }}
                    >
                        <h5> {t("pages.UserDetailBox.Password")}</h5>
                        <FormControl
                            variant="standard"
                            fullWidth
                            className="input-box"
                        >
                            <Input
                                id="standard-adornment-password"
                                className="input-pass"
                                type={showPassword ? "text" : "password"}
                                name="pass"
                                onChange={formik.handleChange}
                                value={formik.values.pass}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            disableRipple
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
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
                        {passwordError !== null ? (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {passwordError}
                            </span>
                        ) : formik.errors.pass && formik.touched.pass ? (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {formik.errors.pass}
                            </span>
                        ) : null}
                    </Typography>
                    <Typography
                        variant="body1"
                        component={"div"}
                        className="content-box"
                        sx={{ width: "100%" }}
                    >
                        <h5> {t("pages.UserDetailBox.Confirm_Password")}</h5>
                        <FormControl
                            variant="standard"
                            fullWidth
                            className="input-box"
                        >
                            <Input
                                id="standard-adornment-password"
                                className="input-pass"
                                type={showPassword ? "text" : "password"}
                                name="ConPass"
                                onChange={formik.handleChange}
                                value={formik.values.ConPass}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            disableRipple
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
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
                        {passwordError !== null ? (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {passwordError}
                            </span>
                        ) : formik.errors.ConPass && formik.touched.ConPass ? (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {formik.errors.ConPass}
                            </span>
                        ) : null}
                    </Typography>
                    <Typography
                        variant="body1"
                        component={"div"}
                        className="content-box"
                        sx={{ width: "100%" }}
                    >
                        <h5> {t("pages.UserDetailBox.Rule")}</h5>
                        <FormControl fullWidth>
                            {roleData.length && (
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={handleChange}
                                    className="input-box"
                                    sx={{ height: "60px" }}
                                >
                                    {roleData.map((el, index) => {
                                        return (
                                            <MenuItem value={el.id} key={el.id}>
                                                {el.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            )}
                        </FormControl>
                        {role_idError !== null && (
                            <span
                                style={{
                                    width: "100%",
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                }}
                            >
                                {role_idError}
                            </span>
                        )}
                    </Typography>

                    <Button
                        className="submit"
                        variant="contained"
                        type="submit"
                    >
                        {t("pages.UserDetailBox.Submit")}
                    </Button>
                    <span
                        style={{
                            display: showErrorForm ? "block" : "none",
                            color: "red",
                            textAlign: "center",
                            width: "100%",
                        }}
                    >
                        {t("pages.UserDetailBox.email_or_password_is_wrong")}
                    </span>
                </Typography>
            </div>
        </>
    );
};

export default UserAddBox;
