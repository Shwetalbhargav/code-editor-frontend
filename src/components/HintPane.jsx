import React from "react";
import { FaLightbulb } from "react-icons/fa";

const HintPane = ({ hint }) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow">
      <div className="flex items-center gap-2 mb-2">
        <FaLightbulb className="text-yellow-500" />
        <h3 className="font-semibold">AI Hint</h3>
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">
        {hint || "Click the Hint button to generate an AI explanation of your code."}
      </p>
    </div>
  );
};

export default HintPane;
