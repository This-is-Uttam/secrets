import React from "react";
import logo from "../assets/logo-red.png";

const LogoLayout = () => {
  return (
    <div className="flex flex-col w-screen m-auto gap-3 py-5 justify-center items-center">
      <div className="flex gap-1">
        <img width={50} src={logo} alt="logo"/>
        <div className="text-5xl font-bold text-red-500 text-center">Secrets</div>
      </div>
      <div className="italic font-light ml-2">For keeping your passwords Secret.</div>
    </div>
  );
};

export default LogoLayout;
