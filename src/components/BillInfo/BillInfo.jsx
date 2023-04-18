import React from "react";
import { Box, Container, Grid } from "@mui/material";
import logo from "../../assets/Img/logo.png";
import "./BillInfo.css";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function BillInfo({ data }) {

  const [t, i18n] = useTranslation();
  let param = useParams()
  // console.log(i18n.language);

  return (
    <section className="bill-info" style={{ marginBottom: "2rem" }}>
      <Container>
        <Grid
          className="info-content"
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Grid
            item
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <div className=" flex ">
                <h3>{t("print.Project_Name")}</h3> : <h3>
                  {data?.project_name}
                </h3>
              </div>
              <div className=" flex ">
                <h3>{t("print.Email")}</h3> : <h3>
                  {data?.email}
                </h3>
              </div>
              <div className=" flex ">
                <h3>{t("print.Phone")}</h3> : <h3>
                  {data?.phone}
                </h3>
              </div>
              <div className=" flex ">
                <h3>{t("print.Date")}</h3> : <h3>
                  {data?.created_at}
                </h3>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <img src={logo} alt="logo" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default BillInfo;
