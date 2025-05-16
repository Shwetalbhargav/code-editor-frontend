import React, { useState } from "react";
import { FaPlay, FaSave, FaMagic } from "react-icons/fa";

const Editor = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
        </select>
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
            <FaPlay /> Run
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
            <FaSave /> Save
          </button>
          <button className="bg-purple-500 text-white px-3 py-1 rounded flex items-center gap-1">
            <FaMagic /> Hint
          </button>
        </div>
      </div>
      <textarea
        rows={16}
        className="w-full border rounded p-2 font-mono resize-none"
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
};

export default Editor;
