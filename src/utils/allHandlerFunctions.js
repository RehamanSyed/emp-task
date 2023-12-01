// Function to open a dialog
export const dialogeOpenHandler = (id, setEmpId, setOpenDialogue) => {
  setOpenDialogue(true);
  setEmpId(id);
};

// Function to close a dialog
export const dialogeCloseHandler = (setOpenDialogue) => {
  setOpenDialogue(false);
};

// Function to confirm employee deletion
export const confirmDeleteHandler = (
  empId,
  setOpenDialogue,
  deleteEmployeeData,
  setIsLoading
) => {
  deleteEmployeeData(empId);
  setOpenDialogue(false);
  setIsLoading(false);
};

// Function to close a modal
export const modalCloseHandler = (setOpenModal) => {
  setOpenModal(false);
};

// Function to open a modal,
export const modalOpenHandler = (
  id,
  setOpenModal,
  setEmpId,
  editEmployeeData
) => {
  setOpenModal(true);
  setEmpId(id);
  editEmployeeData(id);
};
