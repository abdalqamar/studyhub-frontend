import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NavigatorButton = () => {
  return (
    <>
      <Link to={"/"} className="absolute top-40 left-10 z-20 ">
        <button className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-slate-800/50 border border-slate-700/50 rounded-xl text-white backdrop-blur-xl hover:bg-slate-700/50 transition-all hover:-translate-x-1">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </Link>
    </>
  );
};

export default NavigatorButton;
