import { empList } from "@/utils/empData";
import { create } from "zustand";

export const useEmpStore = create((set) => ({
  empList: [],
  singleEmpData: [],

  allEmployeList: () => {
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    console.log("Emp List data", allEmpData);
    set(() => ({
      empList: allEmpData,
    }));
  },
  setEmployeList: () => {
    if (typeof window !== "undefined") {
      const allEmpData = JSON.parse(localStorage.getItem("empData"));
      console.log("Emp List data", allEmpData.data);
      set({ empList: allEmpData.data });
    }
  },

  saveEmployeData: (data) => {
    console.log("you call here save Emp Details", data);
    const allEmpData = JSON.parse(localStorage.getItem("empData"));

    const updatedArray = allEmpData.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );

    console.log("in store emp data save Emp Details --->", updatedArray); // Use state.empList instead of empList
    localStorage.setItem("empData", JSON.stringify(updatedArray));
    set(() => ({ empList: updatedArray }));
    console.log("after store emp data", empList); // Use state.empList instead of empList
  },
  addEmployee: (data) => {
    console.log("emp data to be added", data);
    const existingData = JSON.parse(localStorage.getItem("empData"));
    const updatedData = [
      ...existingData,
      { ...data, id: existingData.length + 1 },
    ];
    console.log("Updated list", updatedData);
    localStorage.setItem("empData", JSON.stringify(updatedData));
    // const dataAlreadyExists = existingData?.some(
    //   (item) =>
    //     item.employee_name === data.employee_name &&
    //     item.employee_age === data.employee_age
    // );

    // console.log("already exist data", dataAlreadyExists);

    // if (!dataAlreadyExists) {
    // }
    // console.log("in store emp data", empList); // Use state.empList instead of empList
    set(() => ({ empList: updatedData }));
    // console.log("after store emp data", empList); // Use state.empList instead of empList
  },
  editEmployee: (id) => {
    console.log("you call herer edit", id);
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    const updatedEmpList = allEmpData.find((item) => item.id === id);
    // console.log("Emp Details find ---->", updatedEmpList);
    // localStorage.setItem("empData", JSON.stringify(updatedEmpList));
    set(() => ({ singleEmpData: updatedEmpList }));
  },
  deleteEmployee: (id) => {
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    const updatedEmpList = allEmpData.filter((employee) => employee.id !== id);
    // console.log("deletedArray -->", updatedEmpList);
    localStorage.setItem("empData", JSON.stringify(updatedEmpList));
    set({ empList: updatedEmpList });
  },
}));
