/*
  This module defines a Zustand store for managing employee data, providing
  functions to retrieve, save, add, edit, and delete employee information.
*/

import { create } from "zustand";

// Define the store
export const useEmpStore = create((set) => ({
  empList: [],
  singleEmpData: [],

  // Function to retrieve all employees data
  allEmployeList: () => {
    const allEmpData = getLocalStorageData();
    set(() => ({ empList: allEmpData }));
  },

  // Function to save updated employee data
  saveEmployeData: (data) => {
    const allEmpData = getLocalStorageData();
    const updatedEmpData = allEmpData.map((employee) =>
      employee.id === data.id ? { ...employee, ...data } : employee
    );
    localStorage.setItem("empData", JSON.stringify(updatedEmpData));
    set(() => ({ empList: updatedEmpData }));
  },

  // Function to add a new employee
  addEmployee: (data) => {
    const existingData = getLocalStorageData();

    existingData.unshift();
    const updatedEmpData = [
      { ...data, id: existingData.length + 1 },
      ...existingData,
      ,
    ];

    localStorage.setItem("empData", JSON.stringify(updatedEmpData));
    set(() => ({ empList: updatedEmpData }));
  },

  // Function to edit
  editEmployee: (id) => {
    const allEmpData = getLocalStorageData();
    const updatedEmpList = allEmpData.find((employee) => employee.id === id);
    set(() => ({ singleEmpData: updatedEmpList }));
  },

  // Function to delete
  deleteEmployee: (id) => {
    const allEmpData = getLocalStorageData();
    const deletedEmp = allEmpData.filter((employee) => employee.id !== id);
    localStorage.setItem("empData", JSON.stringify(deletedEmp));
    set(() => ({ empList: deletedEmp }));
  },
}));

// Helper function to retrieve and parse localStorage data
const getLocalStorageData = () => {
  return JSON.parse(localStorage.getItem("empData")) || [];
};
