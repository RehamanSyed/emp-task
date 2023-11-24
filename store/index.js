import { empList } from "@/utils/empData";
import { create } from "zustand";

export const useEmpStore = create((set) => ({
  empList: [],
  singleEmpData: [],

  allEmployeList: () => {
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    set(() => ({
      empList: allEmpData,
    }));
  },
  saveEmployeData: (data) => {
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    const updatedArray = allEmpData.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );

    localStorage.setItem("empData", JSON.stringify(updatedArray));
    set(() => ({ empList: updatedArray }));
  },
  addEmployee: (data) => {
    const existingData = JSON.parse(localStorage.getItem("empData"));
    const updatedData = [
      ...existingData,
      { ...data, id: existingData.length + 1 },
    ];
    localStorage.setItem("empData", JSON.stringify(updatedData));
    set(() => ({ empList: updatedData }));
  },
  editEmployee: (id) => {
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    const updatedEmpList = allEmpData.find((item) => item.id === id);
    set(() => ({ singleEmpData: updatedEmpList }));
  },
  deleteEmployee: (id) => {
    const allEmpData = JSON.parse(localStorage.getItem("empData"));
    const updatedEmpList = allEmpData.filter((employee) => employee.id !== id);
    localStorage.setItem("empData", JSON.stringify(updatedEmpList));
    set(() => ({ empList: updatedEmpList }));
  },
}));
