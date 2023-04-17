import { ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardBox = ({ title, number, Icon, path }) => {
    let navigate = useNavigate();

    return (
        <>
            <Grid item xs={12} md={6} xl={4}>
                <div
                    className="content cursor-pointer bg-white min-h-[150px] add-shadow-main p-5 flex  justify-between items-center gap-[20px]"
                    onClick={(e) => {
                        if (path) {
                            navigate(path);
                        }
                        // //console.log(path)
                    }}
                >
                    <div className="box flex flex-col justify-start items-start gap-2">
                        <h5 className="text-primaryBg !text-[20px] font-[600] capitalize">
                            {" "}
                            {title}
                        </h5>
                        <span className="text-primaryBg !text-[20px] font-[600] capitalize">
                            {number}
                        </span>
                    </div>
                    <div>{Icon}</div>
                </div>
            </Grid>
        </>
    );
};

export default CardBox;
