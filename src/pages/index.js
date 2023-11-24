import { useEffect, useState } from "react";
import { Box, Button, Modal, Dialog, DialogContent } from "@mui/material";
import { useRouter } from "next/router";
import { empList } from "@/utils/empData";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { CheckCircle } from "@mui/icons-material";
import Tabs from "@/component/Tabs/Tab";
import EditEmployeeDetails from "@/component/EditEmployeeDetails";
import AddNewEmployee from "@/component/AddNewEmployee";
import EmployeeLists from "@/component/EmployeeLists";
import ViewEmployeDetails from "@/component/ViewEmployeDetails";

import errorImage from "../../public/server.png";
import Image from "next/image";
import { useEmpStore } from "../../store";

export async function getStaticProps() {
  try {
    const response = await fetch(
      "https://dummy.restapiexample.com/api/v1/employees"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      props: { data: empList },
    };
  } catch (error) {
    console.error("Error fetching data", error.message);
    if (error.response && error.response.status === 429) {
      return {
        props: {
          data: null,
          statusCode: 429,
          error: "Too Many Request",
        },
      };
    }
    if (error.response && error.response.status === 500) {
      return {
        props: {
          data: null,
          statusCode: 500,
          error: "Internal Server Error",
        },
      };
    }

    return {
      props: {
        data: null,
        statusCode: 500,
        error: "something went worng ",
      },
    };
  }
}

export default function Home({ data }) {
  const storedActiveTab =
    typeof window !== "undefined" ? localStorage.getItem("activeTab") : null;
  const [activeTab, setActiveTab] = useState(storedActiveTab || "view");

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const [empId, setEmpId] = useState();
  const [openaddDia, setOpenAddDia] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const allEmployeList = useEmpStore((state) => state.allEmployeList);
  const editEmployeeData = useEmpStore((state) => state.editEmployee);
  const deleteEmployeeData = useEmpStore((state) => state.deleteEmployee);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const dialogeOpenAddHandler = () => {
    setOpen(true);
  };
  const dialogeOpenHandler = (id) => {
    console.log("dialoge Open  Handler", id);
    setOpen(true);
    setEmpId(id);
  };
  const dialogeCloseHandler = () => {
    console.log("dialoge Close Handler");
    setOpen(false);
  };
  const confirmDeleteHandler = () => {
    console.log("confirm Delete Handler");
    deleteEmployeeData(empId);
    setOpen(false);
    setIsLoading(false);
  };
  const modalCloseHandler = () => {
    setOpenModal(false);
  };
  const modalOpenHandler = (id) => {
    setOpenModal(true);
    setEmpId(id);
    editEmployeeData(id);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("empData", JSON.stringify(data));
    }
    // fetchData();
    allEmployeList();
  }, [isLoading]);

  // Clear localStorage on component unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem("activeTab");
    };
  }, []);

  return error && error ? (
    <div className="w-[50%] mx-auto  min-h-[500px] flex justify-center">
      <div className="flex flex-col justify-center items-center text-center gap-3 p-10">
        <Image
          src={errorImage}
          alt={"error image"}
          width={96}
          height={96}
          className="grayscale"
        />
        <h1 className="text-5xl text-gray-500 font-extrabold">429</h1>
        <h1>Too Many request</h1>
        <Button
          aria-label="error"
          variant="contained"
          type="submit"
          sx={{
            bgcolor: "#0e7490 !important",
            textTransform: "capitalize",
          }}
          onClick={() => router.reload()}
        >
          send request again
        </Button>
      </div>
    </div>
  ) : (
    <>
      <Box p={5}>
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
        {activeTab === "add" && (
          <AddNewEmployee
            dialogeOpenHandler={dialogeOpenHandler}
            setOpenAddDia={setOpenAddDia}
          />
        )}
        {activeTab === "view" && (
          <EmployeeLists
            setEditMode={setEditMode}
            modalOpenHandler={modalOpenHandler}
            dialogeOpenHandler={dialogeOpenHandler}
            setOpenAddDia={setOpenAddDia}
          />
        )}
      </Box>
      <Dialog
        open={open}
        onClose={dialogeCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {openaddDia ? (
          <DialogContent sx={{ p: 6, textAlign: "center" }}>
            <CheckCircle fontSize={"large"} color="success" />
            <div className="my-5">
              <h1 className="text-2xl font-bold">Succcessfully added</h1>
              <p className="">You have successfully added a new resource</p>
            </div>
            <div className="flex justify-center gap-3 mt-10">
              <Button
                onClick={dialogeCloseHandler}
                autoFocus
                sx={{ background: "primary !important" }}
                color="error"
                variant="outlined"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        ) : (
          <DialogContent sx={{ p: 6, textAlign: "center" }}>
            <CancelOutlinedIcon fontSize={"large"} color="error" />
            <div className="my-5">
              <h1 className="text-2xl font-bold">Are you Sure ?</h1>
              <p className="">Do you really want to delete this record</p>
            </div>
            <div className="flex justify-center gap-3 mt-10">
              <Button onClick={dialogeCloseHandler}>Close</Button>
              <Button
                onClick={() => confirmDeleteHandler(empId)}
                autoFocus
                sx={{ background: "primary !important" }}
                color="error"
                variant="outlined"
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
      <Modal open={openModal} onClose={modalCloseHandler}>
        <Box sx={modalStyle}>
          {editMode ? (
            <EditEmployeeDetails
              modalCloseHandler={modalCloseHandler}
              setOpenModal={setOpenModal}
            />
          ) : (
            <ViewEmployeDetails
              modalCloseHandler={modalCloseHandler}
              setOpenModal={setOpenModal}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
};
