import { useEffect } from "react";
import Image from "next/image";
import group from "../../../public/group.png";
import incorporation from "../../../public/incorporation.png";
import groupwhite from "../../../public/groupwhite.png";
import incorporationwhite from "../../../public/incorporationwhite.png";
import { Box } from "@mui/material";

const Tabs = ({ activeTab, onTabChange }) => {
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <Box className="flex space-x-4 -mt-20 mb-20">
      <Box
        className={`py-2 px-4 text-sm gap-2 flex flex-col justify-center items-center text-center rounded w-36 h-28 ${
          activeTab === "view"
            ? "bg-cyan-700 shadow-xl text-white font-bold"
            : "bg-white shadow"
        }`}
        onClick={() => onTabChange("view")}
      >
        {activeTab === "view" ? (
          <Image src={groupwhite} width={48} height={48} alt={"tab imgs"} />
        ) : (
          <Image src={group} width={48} height={48} alt={"tab imgs"} />
        )}
        View Employee
      </Box>

      <Box
        className={`py-2 px-4 text-sm gap-2 flex flex-col justify-center items-center text-center rounded w-36 h-28  ${
          activeTab === "add"
            ? "bg-cyan-700 shadow-xl text-white font-bold"
            : "bg-white shadow"
        }`}
        onClick={() => onTabChange("add")}
      >
        {activeTab === "add" ? (
          <Image
            src={incorporationwhite}
            width={48}
            height={48}
            alt={"tab imgs"}
          />
        ) : (
          <Image src={incorporation} width={48} height={48} alt={"tab imgs"} />
        )}
        Add Employee
      </Box>
    </Box>
  );
};

export default Tabs;
