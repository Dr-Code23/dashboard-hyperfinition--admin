import { Button, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import SendIcon from "@mui/icons-material/Send";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
const EditComponent = ({ title, inputs, editHandler }) => {
  const [state, setState] = useState({ date: new Date() });
  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editHandler();
  };
  return (
    <div>
      <h3>{title}</h3>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            {inputs.map((input, index) => (
              <TextField
                key={index}
                type={input.type}
                name={input.name}
                id={input.id}
                // value={e => e.target.name}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label={input.label}
                validators={[
                  "required",
                  "minStringLength: 4",
                  "maxStringLength: 9",
                ]}
              />
            ))}
          </Grid>
        </Grid>

        <div align="left">
          <Button color="primary" variant="contained" type="submit">
            <span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</span>

            <SendIcon>send</SendIcon>
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default EditComponent;
