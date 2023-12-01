import Image from "next/image";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useEmpStore } from "../../store";
import fallbackimg from "../../public/avatarpic.jpg";
import {
  dialogeOpenHandler,
  modalOpenHandler,
} from "@/utils/allHandlerFunctions";

const EmployeeLists = ({
  setEditMode,
  setOpenAddDia,
  setOpenModal,
  setEmpId,
  setOpenDialogue,
}) => {
  const empDatalist = useEmpStore((state) => state.empList);
  const editEmployeeData = useEmpStore((state) => state.editEmployee);

  return (
    <div className="relative overflow-auto">
      <table className="w-full  min-h-[350px] ">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-3 w-20">Sno</th>
            <th className="border px-2 py-3 w-20">Emp Id</th>
            <th className="border px-2 py-3 w-20">Image</th>
            <th className="border px-2 py-3">Name</th>
            <th className="border px-2 py-3">Age</th>
            <th className="border px-2 py-3">Salary</th>
            <th className="border px-2 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {empDatalist.map((item, idx) => {
            return (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition duration-300 ease-in-out "
              >
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1 text-center">{`#00${item.id}`}</td>
                <td className="border px-2 py-1">
                  <Image
                    src={
                      item.profile_image
                        ? `/${item.profile_image}`
                        : fallbackimg
                    }
                    width={50}
                    height={50}
                    alt="profile image"
                  />
                </td>
                <td className="border px-2 py-1">
                  {item?.employee_name?.length > 25
                    ? item?.employee_name.substring(0, 24) + "..."
                    : item?.employee_name}
                </td>
                <td className="border px-2 py-1 text-center">
                  {item?.employee_age}
                </td>
                <td className="border px-2 py-1 text-center">
                  {item?.employee_salary}
                </td>

                <td className="border px-2 py-1 w-32">
                  <div className="flex gap-1">
                    <Tooltip title="View">
                      <IconButton
                        aria-label="view"
                        onClick={() => {
                          setEditMode(false);
                          modalOpenHandler(
                            item.id,
                            setOpenModal,
                            setEmpId,
                            editEmployeeData
                          );
                        }}
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setEditMode(true);
                          modalOpenHandler(
                            item.id,
                            setOpenModal,
                            setEmpId,
                            editEmployeeData
                          );
                        }}
                      >
                        <EditOutlinedIcon size="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setOpenAddDia(false);
                          dialogeOpenHandler(
                            item.id,
                            setEmpId,
                            setOpenDialogue
                          );
                        }}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLists;
