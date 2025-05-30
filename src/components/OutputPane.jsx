import React from "react";
import { FaTerminal } from "react-icons/fa";

const OutputPane = ({ output }) => {
  if (!output) return null;

  const { output: textOutput, outputType, imageUrl, metadata = {} } = output;

  return (
    <div className="bg-black text-white rounded p-4 shadow font-mono text-sm">
      <div className="flex items-center gap-2 mb-2">
        <FaTerminal />
        <h3 className="text-lg font-semibold">Output</h3>
      </div>

      {outputType === "text" && (
        <pre className="text-green-400 whitespace-pre-wrap">
          {textOutput || "No output."}
        </pre>
      )}

      {outputType === "image" && imageUrl && (
        <div className="mt-2">
          <img src={imageUrl} alt="Graphical Output" className="rounded border" />
        </div>
      )}

      {!["text", "image"].includes(outputType) && (
        <p className="text-red-400">⚠️ Unsupported output type.</p>
      )}

      <div className="mt-4 text-gray-400">
        {metadata.executionTime && <p>⏱ Execution Time: {metadata.executionTime} ms</p>}
        {metadata.exitCode !== undefined && <p>🚪 Exit Code: {metadata.exitCode}</p>}
        {metadata.errorType && <p>❌ Error Type: {metadata.errorType}</p>}
      </div>
    </div>
  );
};

export default OutputPane;
