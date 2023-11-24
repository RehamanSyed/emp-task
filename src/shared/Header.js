import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className=" absolute w-full py-10 ">
      <div className="container-xl mx-auto w-[50%]">
        <div className="flex items-center justify-between flex-shrink-0 text-white mr-6">
          <Link href="/">
            <span className="font-semibold text-5xl tracking-tight">EMS</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
