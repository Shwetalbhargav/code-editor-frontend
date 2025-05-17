import React, { useState, useEffect, useRef } from "react";
import HintPane from "./HintPane";
import { runCode, saveCode, getHint } from "../services/api";
import { FaSpinner } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";

const LiveEditorWithHint = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [hint, setHint] = useState("");
  const [typedHint, setTypedHint] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const debounceTimer = useRef(null);
  const typingInterval = useRef(null);

  // ⏱️ Auto-hint generation debounce
  useEffect(() => {
    if (!code.trim()) {
      setHint("");
      setTypedHint("");
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      generateHint(language, code);
    }, 1500);
  }, [code, language]);

  const generateHint = async (language, code) => {
    setIsLoadingHint(true);
    setError("");
    setHint("");
    setTypedHint("");

    try {
      const result = await getHint({ language, code });

      if (
        result.toLowerCase().startsWith("error") ||
        result.toLowerCase().includes("gemini")
      ) {
        setError("❌ Hint generation failed. Try again later or check your code.");
        return;
      }

      setHint(result);
    } catch {
      setError("❌ Could not retrieve a hint.");
    } finally {
      setIsLoadingHint(false);
    }
  };

  // 🧠 Typing animation
  useEffect(() => {
    if (!hint) return;

    let i = 0;
    setTypedHint("");
    typingInterval.current = setInterval(() => {
      setTypedHint((prev) => prev + hint[i]);
      i++;
      if (i >= hint.length) clearInterval(typingInterval.current);
    }, 20); // speed of typing

    return () => clearInterval(typingInterval.current);
  }, [hint]);

  const handleRun = async ({ language, code, stdin }) => {
    try {
      const result = await runCode({ language, code, stdin });
      setOutput(result);
    } catch {
      setOutput("⚠️ Error running code.");
    }
  };

  const handleSave = async ({ language, code, stdin }) => {
    try {
      await saveCode({ language, code, stdin });
    } catch {
      console.error("Failed to save code.");
    }
  };

  const handleHint = () => {
    generateHint(language, code);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <Editor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        onRun={handleRun}
        onSave={handleSave}
        onHint={handleHint}
      />

      {/* Progress + Spinner */}
      {isLoadingHint && (
        <div className="flex items-center gap-2 text-purple-600 font-semibold">
          <FaSpinner className="animate-spin" />
          Generating hint...
          <div className="w-full h-1 bg-purple-100 rounded overflow-hidden">
            <div className="h-full bg-purple-500 animate-pulse w-full"></div>
          </div>
        </div>
      )}

      {/* Typing Hint */}
      {typedHint && !isLoadingHint && <HintPane hint={typedHint} />}
      {error && <div className="text-red-600 font-medium">{error}</div>}

      {/* Output */}
      {output && (
        <div className="bg-gray-900 text-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Output:</h3>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default Editor;
