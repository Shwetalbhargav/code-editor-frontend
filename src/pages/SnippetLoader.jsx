import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadCode } from "../services/api";

const SnippetLoader = () => {
  const { id } = useParams();
  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const data = await loadCode(id);
        setCodeData(data);
      } catch (err) {
        setError("Failed to load code snippet.");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  if (loading) {
    return <div className="p-4">🔄 Loading snippet...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Snippet ID: {id}</h2>
      <p className="mb-1 text-sm text-gray-600">Language: <strong>{codeData.language}</strong></p>
      <pre className="bg-gray-900 text-green-400 p-4 rounded whitespace-pre-wrap">
        {codeData.code}
      </pre>
    </div>
  );
};

export default SnippetLoader;
