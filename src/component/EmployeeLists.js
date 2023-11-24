import fallbackimg from "../../public/avatarpic.jpg";
import Image from "next/image";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useEmpStore } from "../..";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const EmployeeLists = ({
  modalOpenHandler,
  dialogeOpenHandler,
  setEditMode,
  setOpenAddDia,
}) => {
  const empDatalist = useEmpStore((state) => state.empList);
  return (
    <>
      <table className="w-full mx-auto min-h-[350px]">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-3">Sno</th>
            <th className="border px-2 py-3">Avatar</th>
            <th className="border px-2 py-3">Name</th>
            <th className="border px-2 py-3">Age</th>
            <th className="border px-2 py-3">Salary</th>
            <th className="border px-2 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {empDatalist ? (
            empDatalist.map((item, idx) => {
              console.log(
                `Prodic imager in list--> /uploads/${item.profile_image}`
              );
              return (
                <tr key={idx}>
                  <td className="border px-2 py-1">{idx + 1}</td>
                  <td className="border px-2 py-1">
                    <Image
                      src={
                        item.profile_image
                          ? `/uploads/${item.profile_image}`
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
                  <td className="border px-2 py-1">{item?.employee_age}</td>
                  <td className="border px-2 py-1">{item?.employee_salary}</td>
                  <td className="border px-2 py-1 w-32">
                    <div className="flex gap-1">
                      <Tooltip title="View">
                        <IconButton
                          aria-label="view"
                          onClick={() => {
                            setEditMode(false);
                            modalOpenHandler(item.id);
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
                            modalOpenHandler(item.id);
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
                            dialogeOpenHandler(item.id);
                          }}
                        >
                          <DeleteForeverRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <td className="border px-2 py-1" rowSpan={4}>
              No data available
            </td>
          )}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeLists;