import {
  Alert,
  Box,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useEmpStore, useStore } from "../../../..";
import { useForm, Controller } from "react-hook-form";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const EditEmployeeDetails = ({ modalCloseHandler }) => {
  const empdata = useEmpStore((state) => state.singleEmpData);
  console.log("Single emp data", empdata);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: empdata.id,
      employee_name: empdata.employee_name,
      employee_salary: empdata.employee_salary,
      employee_age: empdata.employee_age,
      profile_image: empdata.profile_image,
    },
  });

  const saveEmpdata = useEmpStore((state) => state.saveEmployeData);

  const onSubmit = (data) => {
    saveEmpdata(data);
    modalCloseHandler();

    // const existingData = JSON.parse(localStorage.getItem("empData"));
    // const dataAlreadyExists = existingData.some(
    //   (item) =>
    //     item.employee_name === data.employee_name &&
    //     item.employee_age === data.employee_age
    // );

    // console.log("already exist data", dataAlreadyExists);

    // if (!dataAlreadyExists) {
    //   const updatedData = [
    //     ...existingData,
    //     { ...data, id: existingData.length + 1 },
    //   ];
    //   localStorage.setItem("empData", JSON.stringify(updatedData));
    // } else {
    //   setError(true);
    // }
  };
  return (
    <Box>
      <Typography fontSize={24} textAlign="center" fontWeight="bold" mb={5}>
        Edit Employee Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            width: "60%",
            marginX: "auto",
            marginTop: "20px",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          {/* {error && error ? (
          <Alert severity="error">This is an error alert — check it out!</Alert>
        ) : (
          ""
        )}

        <h1>{empdata} around here...</h1> */}
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                id="outlined-basic"
                label="Employee Id"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name="employee_name"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                id="outlined-basic"
                label="Employee Name"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name="employee_age"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                id="outlined-basic"
                label="Age"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name="employee_salary"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                id="outlined-basic"
                label="Salary"
                variant="outlined"
                {...field}
              />
            )}
          />
          <Controller
            name="profile_image"
            control={control}
            render={({ field }) => (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                {...field}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            )}
          />

          <Button aria-label="add employee" variant="outlined" type="submit">
            Save Details
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditEmployeeDetails;
