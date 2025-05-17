import React, { useState } from "react";
import { FaPlay, FaSave, FaMagic } from "react-icons/fa";
import { runCode, saveCode } from "../services/api";
import OutputPane from "./OutputPane";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();
  const code_id = await saveCode({ language, code, stdin });


  const handleRun = async () => {
    if (language === "html") return; // HTML is rendered locally
    try {
      const result = await runCode({ language, code, stdin });
      setOutput(result);
    } catch (err) {
      setOutput("Error executing code.");
    }
  };

  const handleSave = async () => {
    try {
      const code_id = await saveCode({ language, code });
      navigate(`/snippets/${code_id}`);
    } catch (err) {
      alert("Failed to save code.");
    }
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
          <button onClick={handleRun} className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
            <FaPlay /> Run
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
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

      {(language === "python" || language === "javascript") && (
        <textarea
          rows={4}
          className="w-full border rounded p-2 font-mono resize-none mt-2"
          placeholder="Standard input (stdin)..."
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
        />
      )}

      <div className="mt-4">
        {language === "html" ? (
          <iframe
            title="HTML Preview"
            className="w-full h-64 border rounded"
            srcDoc={DOMPurify.sanitize(code)}
          />
        ) : (
          <OutputPane output={output} />
        )}
      </div>
    </div>
  );
};

export default Editor;
