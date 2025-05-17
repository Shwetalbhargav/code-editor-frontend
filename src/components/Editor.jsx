import React, { useState } from "react";
import { FaPlay, FaSave, FaMagic } from "react-icons/fa";
import DOMPurify from "dompurify";

const Editor = ({
  language,
  setLanguage,
  code,
  setCode,
  onRun,
  onSave,
  onHint,
}) => {
  const [stdin, setStdin] = useState("");

  const handleRunClick = () => {
    if (language === "html") return;
    onRun({ language, code, stdin });
  };

  const handleSaveClick = () => {
    onSave({ language, code, stdin });
  };

  const handleHintClick = () => {
    onHint({ language, code });
  };

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
          <button
            onClick={handleRunClick}
            className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <FaPlay /> Run
          </button>
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <FaSave /> Save
          </button>
          <button
            onClick={handleHintClick}
            className="bg-purple-500 text-white px-3 py-1 rounded flex items-center gap-1"
          >
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

      {(language === "python" || language === "javascript") && (
        <textarea
          rows={4}
          className="w-full border rounded p-2 font-mono resize-none mt-2"
          placeholder="Standard input (stdin)..."
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
        />
      )}

      {language === "html" && (
        <div className="mt-4">
          <iframe
            title="HTML Preview"
            className="w-full h-64 border rounded"
            srcDoc={DOMPurify.sanitize(code)}
          />
        </div>
      )}
    </div>
  );
};

export default Editor;
