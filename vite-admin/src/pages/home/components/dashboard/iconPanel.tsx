import type { FC } from "react";
import React from "react";

export const IconPanel: FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
}> = function ({ icon, title, value }) {
  return (
    <span className="rounded-xl shadown-xl shadow-light-700 bg-green-500 flex justify-center items-center m-4 flex-col px-8 py-4">
      <p className="text-xl font-bold">{title}</p>
      {icon}
      <p style={{ margin: "0" }} className="text-xl text-light-300 font-medium">
        {value}
      </p>
    </span>
  );
};
