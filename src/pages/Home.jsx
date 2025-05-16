// src/pages/Home.jsx

import React, { useState } from "react";
import Editor from "../components/Editor";
import OutputPane from "../components/OutputPane";
import HintPane from "../components/HintPane";
import VideoUpload from "../components/VideoUpload";
import { runCode, saveCode, getHint } from "../services/api";

const Home = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [hint, setHint] = useState("");

  const handleRun = async () => {
    try {
      const result = await runCode({ language, code });
      setOutput(result);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  const handleSave = async () => {
    try {
      const id = await saveCode({ language, code });
      alert(`Code saved! ID: ${id}`);
    } catch (err) {
      alert("Error saving code");
    }
  };

  const handleHint = async () => {
    try {
      const aiHint = await getHint({ language, code });
      setHint(aiHint);
    } catch (err) {
      setHint("Error generating hint");
    }
  };

  return (
    <main className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-2">
        <Editor
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          onRun={handleRun}
          onSave={handleSave}
          onHint={handleHint}
        />
      </div>
      <div className="flex flex-col gap-4">
        <VideoUpload />
        <HintPane hint={hint} />
        <OutputPane output={output} />
      </div>
    </main>
  );
};

export default Home;
