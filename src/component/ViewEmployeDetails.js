import Image from "next/image";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEmpStore } from "../../store";
import fallbackimg from "../../public/avatarpic.jpg";

const ViewEmployeDetails = ({ setOpenModal }) => {
  const empdata = useEmpStore((state) => state.singleEmpData);

  return (
    <Stack spacing={2} noValidate autoComplete="off" mb={5}>
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
            empdata.profile_image ? `/${empdata.profile_image}` : fallbackimg
          }
          width={150}
          height={250}
          alt="profile image"
          className="-mt-36 rounded-lg bg-white p-2 shadow-xl"
        />
      </Box>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} px={4}>
          <TextField
            defaultValue={empdata.id}
            name="id"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ backgroundColor: "#f2f2f2" }}
            label="Employee Id"
            variant="outlined"
          />
          <TextField
            name="employee_name"
            defaultValue={empdata.employee_name}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            sx={{ backgroundColor: "#f2f2f2" }}
            label="Employee Name"
            variant="outlined"
          />
        </Stack>

        <Stack direction="row" spacing={2} px={4}>
          <TextField
            name="employee_age"
            defaultValue={empdata.employee_age}
            fullWidth
            sx={{ backgroundColor: "#f2f2f2" }}
            InputProps={{
              readOnly: true,
            }}
            label="Age"
            variant="outlined"
          />
          <TextField
            name="employee_salary"
            defaultValue={empdata.employee_salary}
            fullWidth
            sx={{ backgroundColor: "#f2f2f2" }}
            InputProps={{
              readOnly: true,
            }}
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
  );
};

export default ViewEmployeDetails;
