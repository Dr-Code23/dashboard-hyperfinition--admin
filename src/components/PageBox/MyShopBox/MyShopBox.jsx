import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import img from "../../../assets/Img/default.jpg";

import "./MyShopBox.css";

const MyShopBox = ({ open, setOpen, editData, setEditData }) => {




  return (
    <>
      <div className="myShop-box">
        <Container>



          <Grid
            container
            spacing={6}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <img
                className="default"
                src={img}
                alt="Default Img"
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>


              <h2>Name: abc</h2>
              <h4>Phone: 01254569</h4>
              <h4>Address: Eversst Seller</h4>
              <Button
                variant="contained"
                sx={{
                  mt: "20px",
                  width: "130px",
                  height: "45px",
                  fontSize: "18px",
                }}
                onClick={() => {
                  setOpen(true);
                  setEditData({
                    img: img,
                    name: "abc",
                    phone: "01254569",
                    address: "Eversst Seller",
                  });
                }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

    </>
  );

};

export default MyShopBox;



