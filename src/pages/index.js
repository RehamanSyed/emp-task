import { useEffect, useState } from "react";
import { Box, Button, Modal, Dialog, DialogContent } from "@mui/material";
import { useRouter } from "next/router";
import { empList } from "@/utils/empData";
import { CheckCircle } from "@mui/icons-material";
import Tabs from "@/component/Tabs/Tab";
import EditEmployeeDetails from "@/component/EditEmployeeDetails";
import AddNewEmployee from "@/component/AddNewEmployee";
import EmployeeLists from "@/component/EmployeeLists";
import ViewEmployeDetails from "@/component/ViewEmployeDetails";
import errorImage from "../../public/server.png";
import Image from "next/image";
import { useEmpStore } from "../../store";
import {
  confirmDeleteHandler,
  dialogeCloseHandler,
  modalCloseHandler,
} from "@/utils/allHandlerFunctions";

export async function getStaticProps() {
  try {
    const res = await fetch(
      "https://dummy.restapiexample.com/api/v1/employees"
    );
    if (res.status === 429) {
      throw new Error("Too Many Requests. Please try again later.");
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    const data = await res.json();
    return {
      props: {
        employeesList: data.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        employeesList: [],
        error: error.message,
      },
    };
  }
}

export default function Home({ employeesList, error }) {
  const storedActiveTab =
    typeof window !== "undefined" ? localStorage.getItem("activeTab") : null;
  const [activeTab, setActiveTab] = useState(storedActiveTab || "view");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [empId, setEmpId] = useState();
  const [openaddDia, setOpenAddDia] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const allEmployeList = useEmpStore((state) => state.allEmployeList);
  const deleteEmployeeData = useEmpStore((state) => state.deleteEmployee);

  useEffect(() => {
    localStorage.setItem("empData", JSON.stringify(employeesList));
    return () => {
      if (typeof window === "undefined") {
        localStorage.removeItem("activeTab");
      }
    };
  }, []);

  useEffect(() => {
    allEmployeList();
  }, [isLoading]);

  return error && employeesList.length === 0 ? (
    <div className="w-[50%] mx-auto min-h-[500px] flex justify-center">
      <div className="flex flex-col justify-center items-center text-center gap-3 p-10">
        <Image
          src={errorImage}
          alt={"error image"}
          width={96}
          height={96}
          className="grayscale"
        />
        <h1 className="text-5xl text-gray-500 font-extrabold">429</h1>
        <h1>{error}</h1>
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
          Refresh Page
        </Button>
      </div>
    </div>
  ) : (
    <>
      <div className="p-4 md:p-6 lg:p-8 xl:p-10">
        <Tabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
        {activeTab === "add" && (
          <AddNewEmployee
            setOpenAddDia={setOpenAddDia}
            setEmpId={setEmpId}
            setOpenDialogue={setOpenDialogue}
          />
        )}
        {activeTab === "view" && (
          <EmployeeLists
            setEditMode={setEditMode}
            setOpenAddDia={setOpenAddDia}
            setOpenModal={setOpenModal}
            setEmpId={setEmpId}
            setOpenDialogue={setOpenDialogue}
          />
        )}
      </div>

      <Dialog open={openDialogue}>
        <DialogContent sx={{ p: 6, textAlign: "center" }}>
          <CheckCircle fontSize={"large"} color="success" />
          <div className="my-5">
            <h1 className="text-2xl font-bold">
              {openaddDia ? "Succcessfully added." : "Are you Sure?"}
            </h1>
            <p className="">
              {openaddDia
                ? "You have successfully added a new resource."
                : "Do you really want to delete this record."}
            </p>
          </div>
          <div className="flex justify-center gap-3 mt-10">
            <Button
              onClick={() => dialogeCloseHandler(setOpenDialogue)}
              variant="outlined"
              color="error"
              sx={{
                textTransform: "capitalize",
              }}
            >
              Close
            </Button>

            {!openaddDia && (
              <Button
                onClick={() =>
                  confirmDeleteHandler(
                    empId,
                    setOpenDialogue,
                    deleteEmployeeData,
                    setIsLoading
                  )
                }
                sx={{ border: "1px solid #0e7490", color: "#0e7490" }}
                variant="outlined"
              >
                Confirm
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Modal open={openModal}>
        <Box sx={modalStyle}>
          {editMode ? (
            <EditEmployeeDetails
              modalCloseHandler={() => modalCloseHandler(setOpenModal)}
              setOpenModal={setOpenModal}
            />
          ) : (
            <ViewEmployeDetails
              modalCloseHandler={() => modalCloseHandler(setOpenModal)}
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
  width: "90%",
  maxWidth: "600px",
  borderRadius: "10px",
  aspectRatio: "16 / 9",
  bgcolor: "background.paper",
  boxShadow: 24,
  margin: "0 auto",
};
