
import React, { useState } from "react";
import { FaLightbulb, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";

const HintPane = ({ hint, onRemove }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        {/* Collapsible Header */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaLightbulb className="text-yellow-500" />
          <h3 className="font-semibold">AI Hint</h3>
          {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
        </div>

        {/* Remove button stays outside the collapse click area */}
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          <FaTimes />
        </button>
      </div>

      {/* Collapsible content */}
      {!isCollapsed && (
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {hint || "Click the Hint button to generate an AI explanation of your code."}
        </p>
      )}
    </div>
  );
};

export default HintPane;
