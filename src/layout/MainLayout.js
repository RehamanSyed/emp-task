import React from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const MainLayout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main className={`min-h-screen  bg-blue-50 ${inter}`}>
        <div className="flex justify-start py-28 gap-4 flex-col items-start min-h-[350px] bg-slate-400 bg-gradient-to-r from-[#23899d] from-10%  to-[#9cc8be] to-100%">
          <div className="container-lg mx-auto w-[90%] xl:w-[50%] md:w-[80%] rounded-xl">
            <h1 className="text-4xl text-white font-extrabold">Hello Admin</h1>
            <h1 className="text-lg text-white font-medium">
              Welcome to Employe Management System
            </h1>
          </div>
        </div>
        <div className="container-lg mx-auto w-[90%]  md:w-[80%] xl:w-[50%] bg-white -mt-12 rounded-xl">
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
