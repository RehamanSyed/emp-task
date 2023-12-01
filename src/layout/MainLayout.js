import React from "react";
const MainLayout = ({ children }) => {
  return (
    <main className={`min-h-screen bg-gray-50`}>
      <div className="py-28 gap-4 min-h-[350px] bg-slate-400 bg-gradient-to-r from-[#23899d] from-10%  to-[#37a766] to-100%">
        <div className="container-lg mx-auto w-[90%] xl:w-[60%] md:w-[80%]">
          <h1 className="text-4xl text-white font-extrabold">Hello Admin</h1>
          <p className="text-lg text-white font-medium">
            Welcome to Employe Management System
          </p>
        </div>
      </div>
      <div className="container-lg mx-auto w-[90%]  md:w-[80%] xl:w-[60%] bg-white -mt-20 rounded-xl">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
