import {
  Alert,
  Box,
  Button,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import fallbackimg from "../../public/avatarpic.jpg";
import Image from "next/image";
import { Close } from "@mui/icons-material";
import { uploadFileToFolder } from "@/utils/uploadFile";
import { useEmpStore } from "../../store";

const EditEmployeeDetails = ({ modalCloseHandler, setOpenModal }) => {
  const empdata = useEmpStore((state) => state.singleEmpData);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: empdata.id,
      employee_name: empdata.employee_name,
      employee_salary: empdata.employee_salary,
      employee_age: empdata.employee_age,
      profile_image: empdata.profile_image,
    },
  });

  const saveEmpdata = useEmpStore((state) => state.saveEmployeData);

  const onSubmit = async (data) => {
    try {
      const responseData = await uploadFileToFolder(data);
      console.log("Resonspe Data", responseData);

      if (!responseData.success) {
        setError(true);
      }
      const fileKey = Object.keys(data.profile_image)[0];
      const fileName = data.profile_image[fileKey].name;

      const convertedData = {
        ...data,
        profile_image: fileName,
        employee_age: +data.employee_age,
        employee_salary: +data.employee_salary,
      };
      console.log(convertedData);
      saveEmpdata(convertedData);
      modalCloseHandler();
    } catch (error) {
      // setError(true);
      console.error("Error uploading image:", error);
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{}} spacing={2} noValidate autoComplete="off" mb={5}>
          <Box
            sx={{
              minHeight: 150,
              background: "#f5f5f5",
              borderRadius: "10px 10px 0px 0px",
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              px: 4,
            }}
          ></Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "start",
              alignItems: "end",
              p: 4,
            }}
          >
            <Image
              src={
                empdata.profile_image
                  ? `/uploads/${empdata.profile_image}`
                  : fallbackimg
              }
              width={150}
              height={150}
              alt="profile image"
              className="-mt-36 rounded-lg bg-white p-2 shadow-xl"
            />
            <Stack direction="row" spacing={2}>
              <label>
                <input type="file" {...register("profile_image")} />
              </label>

              {errors.profile_image && (
                <p className="text-red-600 text-sm ">
                  {errors.profile_image.message}
                </p>
              )}
            </Stack>
          </Box>

          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} px={4}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    disabled
                    readonly
                    InputProps={{
                      readOnly: true,
                    }}
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
                rules={{
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Name should contain only alphabets",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Employee Name"
                    variant="outlined"
                    {...field}
                    error={Boolean(errors.employee_name)}
                    helperText={errors.employee_name?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} px={4}>
              <Controller
                name="employee_age"
                control={control}
                rules={{
                  required: "Age  is required",
                  validate: (value) => {
                    if (!Number.isInteger(Number(value))) {
                      return "Age should be an integer";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Age"
                    variant="outlined"
                    error={Boolean(errors.employee_age)}
                    helperText={errors.employee_age?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="employee_salary"
                control={control}
                rules={{
                  required: "Salary  is required",
                  validate: (value) => {
                    const isInteger = /^\d+$/.test(value);
                    const isPositive = Number(value) > 0;

                    if (!isInteger || !isPositive) {
                      return "Salary should be a positive integer and not decimal number";
                    }

                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Salary"
                    variant="outlined"
                    error={Boolean(errors.employee_salary)}
                    helperText={errors.employee_salary?.message}
                    {...field}
                  />
                )}
              />
            </Stack>

            <Stack direction="row" spacing={2} px={4}>
              <Button
                type="submit"
                aria-label="add employee"
                variant="contained"
                sx={{
                  bgcolor: "#0e7490 !important",
                  textTransform: "capitalize",
                }}
              >
                Save Details
              </Button>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              px={4}
              position={"absolute"}
              top={0}
              right={0}
            >
              <IconButton
                aria-label="close"
                color="white"
                onClick={() => setOpenModal(false)}
                sx={{ bgcolor: "White !important" }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default EditEmployeeDetails;
