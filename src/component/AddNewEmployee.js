import { Alert, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { uploadFileToFolder } from "@/utils/uploadFile";
import { useEmpStore } from "../../store";
import { dialogeOpenHandler } from "@/utils/allHandlerFunctions";

const AddNewEmployee = ({ setOpenAddDia, setOpenDialogue, setEmpId }) => {
  const [error, setError] = useState(false);
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employee_name: "",
      employee_salary: "",
      employee_age: "",
      profile_image: "",
    },
  });

  const addEmployee = useEmpStore((state) => state.addEmployee);

  const onSubmit = async (data) => {
    try {
      // Upload image Function
      const responseData = await uploadFileToFolder(data);

      if (!responseData.success) {
        setError(true);
        return;
      }

      // Extract file information and update  form data
      const fileKey = Object.keys(data.profile_image)[0];
      const fileName = data.profile_image[fileKey].name;
      const convertedData = {
        ...data,
        profile_image: fileName,
        employee_age: +data.employee_age,
        employee_salary: +data.employee_salary,
      };

      // Add the employee with the updated data
      addEmployee(convertedData);

      // Open the dialog and reset the form
      dialogeOpenHandler(data.id, setEmpId, setOpenDialogue);
      setOpenAddDia(true);
      reset();
    } catch (error) {
      setError(true);
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="w-[50%]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            {error && error && (
              <Alert severity="error" onClose={() => {}}>
                Something went worng
              </Alert>
            )}

            <label>
              <input
                type="file"
                {...register("profile_image", {
                  required: "Image is required",
                })}
              />
            </label>

            {errors.profile_image && (
              <p className="text-red-500 text-xs">
                {errors.profile_image.message}
              </p>
            )}
          </Stack>
          <Stack spacing={2}>
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
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Controller
              name="employee_age"
              control={control}
              rules={{
                required: "Age  is required",
                validate: (value) => {
                  if (!Number.isInteger(Number(value))) {
                    return "Age should be an integer";
                  }
                  if (Number(value) >= 100) {
                    return "Age should not be greater than 100";
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
                required: "Employe salary is required",
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
                  {...field}
                  error={Boolean(errors.employee_salary)}
                  helperText={errors.employee_salary?.message}
                />
              )}
            />
          </Stack>
          <Button
            aria-label="add employee"
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "#0e7490 !important",
              textTransform: "capitalize",
            }}
          >
            Add Employee
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddNewEmployee;
