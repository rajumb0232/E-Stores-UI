import React from "react";

const FormHeader = ({ icon, text }) => {
  return (
    <h1 className="text-slate-700 font-semibold text-4xl my-8 flex justify-start w-full">
      <div className="mt-1 mr-2">{icon}</div>
      {text}
    </h1>
  );
};

export default FormHeader;
