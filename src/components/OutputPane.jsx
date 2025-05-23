import React from "react";
import { FaTerminal } from "react-icons/fa";

const OutputPane = ({ output }) => {
  return (
    <div className="bg-black text-white rounded p-4 shadow">
      <div className="flex items-center gap-2 mb-2">
        <FaTerminal />
        <h3 className="text-lg font-semibold">Output</h3>
      </div>
      <pre className="text-green-400 text-sm whitespace-pre-wrap">
        {output || "Run code to see output..."}
      </pre>
    </div>
  );
};

export default OutputPane;
