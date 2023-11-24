import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import React from "react";

import Image from "next/image";
import fallbackimg from "../../public/avatarpic.jpg";
import { Close } from "@mui/icons-material";
import { useEmpStore } from "../../store";

const ViewEmployeDetails = ({ setOpenModal }) => {
  const empdata = useEmpStore((state) => state.singleEmpData);

  return (
    <Box>
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
        >
          <Typography fontSize={24} textAlign="right" fontWeight="bold" mb={2}>
            {empdata.employee_name} Details
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "start", p: 4 }}>
          <Image
            src={
              empdata.profile_image
                ? `/uploads/${empdata.profile_image}`
                : fallbackimg
            }
            width={150}
            height={250}
            alt="profile image"
            className="-mt-36 rounded-lg"
          />
        </Box>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} px={4}>
            <TextField
              defaultValue={empdata.id}
              name="id"
              fullWidth
              id="outlined-basic"
              label="Employee Id"
              variant="outlined"
            />
            <TextField
              name="employee_name"
              defaultValue={empdata.employee_name}
              fullWidth
              id="outlined-basic"
              label="Employee Name"
              variant="outlined"
            />
          </Stack>

          <Stack direction="row" spacing={2} px={4}>
            <TextField
              name="employee_age"
              defaultValue={empdata.employee_age}
              fullWidth
              id="outlined-basic"
              label="Age"
              variant="outlined"
            />
            <TextField
              name="employee_salary"
              defaultValue={empdata.employee_salary}
              fullWidth
              id="outlined-basic"
              label="Salary"
              variant="outlined"
            />
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
    </Box>
  );
};

export default ViewEmployeDetails;
