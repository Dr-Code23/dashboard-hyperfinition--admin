import { Button, FormControl, Grid } from "@mui/material";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
let dataRoles = [
    {
        name: "Order Management",
        status: false,
    },
    {
        name: "User Section",
        status: false,
    },
    {
        name: "Order Management",
        status: true,
    },
    {
        name: "Report & Analytics",
        status: false,
    },
    {
        name: "Refund management",
        status: false,
    },
    {
        name: "Product Management",
        status: true,
    },
    {
        name: "Support Section",
        status: false,
    },
    {
        name: "Order Management",
        status: true,
    },
    {
        name: "Employee Section",
        status: true,
    },
    {
        name: "Dashboard",
        status: false,
    },
];
const RolesBoxAdd = () => {
    let { t, i18n } = useTranslation();
    return (
        <>
            <div className="p-[20px] mt-[40px]">
                <form
                    action=""
                    className="add-box flex  items-start justify-start flex-col px-5 py-[60px]  mb-[40px] add-shadow  "
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className=" flex flex-wrap  w-full gap-[30px] justify-start items-center">
                        <FormControl className="min-h-[75.5px] min-w-[250px] w-full ">
                            <h6 className=" text-[17px]  mb-3 font-[500] capitalize  ">
                                {t("pages.RolesBoxAdd.Role_Name")}
                            </h6>
                            <input type="text" />
                        </FormControl>
                    </div>
                    {/* ======================== */}
                    <hr className=" w-full my-[40px]" />

                    <Grid
                        container
                        spacing={0}
                        className=" w-full bg-slate-50 min-h-[300px]"
                    >
                        {dataRoles.length &&
                            dataRoles.map((el, index) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        lg={4}
                                        className="p-5"
                                        key={index}
                                    >
                                        <div className=" w-full  bg-white px-[20px] py-[10px]">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    // defaultChecked={el.status}
                                                    />
                                                }
                                                onChange={(e) => {
                                                    // console.log(e.currentTarget.parentElement.parentElement.dataset.name)
                                                    // console.log(e.target.checked)
                                                }}
                                                label={el.name}
                                                data-name={el.name}
                                            />
                                        </div>
                                    </Grid>
                                );
                            })}
                    </Grid>

                    <hr className=" w-full my-[40px]" />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className=" !bg-primaryBg  !w-full md:!w-[130px] !h-[50px]  !mt-[30px] !ml-auto"
                    >
                        {t("pages.RolesBoxAdd.Submit")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default RolesBoxAdd;
