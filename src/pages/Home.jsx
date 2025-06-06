import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { FaPlay, FaSave, FaMagic } from "react-icons/fa";
import OutputPane from "../components/OutputPane";
import HintPane from "../components/HintPane";
import { runCode, saveCode, getHint } from "../services/api";
import { Rnd } from "react-rnd";

const Home = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState(null); // ✅ fixed from ""
  const [hint, setHint] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHint("");
  }, [code]);

  const handleRunClick = async () => {
    try {
      const result = await runCode({ language, code, stdin });
      setOutput(result);
      setHistory((prev) => [...prev, { code, stdin, output: result }]);
    } catch (err) {
      const errorResult = { output: "Error: " + err.message, outputType: "text" };
      setOutput(errorResult);
      setHistory((prev) => [...prev, { code, stdin, output: errorResult }]);
    }
  };

  const handleSaveClick = async () => {
    try {
      const id = await saveCode({ language, code, stdin });
      alert(`Code saved! ID: ${id}`);
    } catch (err) {
      alert("Error saving code");
    }
  };

  const handleHintClick = async () => {
    setHint("Generating hint...");
    setError("");
    try {
      const aiHint = await getHint({ language, code });
      setHint(aiHint);
    } catch (err) {
      setHint("");
      setError("Error generating hint");
    }
  };

  return (
    <main className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col col-span-2">
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

      <div className="flex flex-col gap-4">
        <button
          onClick={() => { setOutput(null); setHistory([]); }}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
        >
          Clear Output
        </button>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 rounded shadow">
            {error}
          </div>
        )}

        {hint && (
          <Rnd default={{ x: 100, y: 100, width: 300, height: 200 }} bounds="window">
            <HintPane hint={hint} onRemove={() => setHint("")} />
          </Rnd>
        )}

        {output && <OutputPane output={output} />}

        {history.map((entry, idx) => (
          <div key={idx} className="bg-gray-800 text-white p-2 mb-2 rounded font-mono text-sm">
            <div className="text-yellow-300"> {entry.code.trim()}</div>
            {entry.stdin && <div className="text-blue-300">{entry.stdin.trim()}</div>}
            <OutputPane output={entry.output} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
