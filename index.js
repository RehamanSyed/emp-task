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
  saveEmployeData: (data) => {
    console.log("you call here save Emp Details", data);
    const allEmpData = JSON.parse(localStorage.getItem("empData"));

    const updatedArray = allEmpData.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );

    console.log("in store emp data save Emp Details --->", updatedArray);
    localStorage.setItem("empData", JSON.stringify(updatedArray));
    set(() => ({ empList: updatedArray }));
    console.log("after store emp data", empList);
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
    set(() => ({ empList: updatedData }));
  },
  editEmployee: (id) => {
    console.log("you call herer edit", id);
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    const updatedEmpList = allEmpData.find((item) => item.id === id);

    set(() => ({ singleEmpData: updatedEmpList }));
  },
  deleteEmployee: (id) => {
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    const updatedEmpList = allEmpData.filter((employee) => employee.id !== id);
    localStorage.setItem("empData", JSON.stringify(updatedEmpList));
    set({ empList: updatedEmpList });
  },
}));
