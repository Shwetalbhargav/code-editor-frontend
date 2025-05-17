import axios from "axios";

const API_BASE_URL = process.env.VITE_API_BASE_URL || "https://code-editor-backend-pync.onrender.com";


// POST: Run code
export const runCode = async ({ language, code, stdin }) => {
  const res = await axios.post(`${API_BASE_URL}/run`, {
    language,
    code,
    stdin: stdin || ""
  });
  return res.data.output;
};

// POST: Save code snippet
export const saveCode = async ({ language, code, stdin  }) => {
  const res = await axios.post(`${API_BASE_URL}/save`, {
    language,
    code,
    stdin: stdin || ""
  });
  return res.data.code_id;
};

// GET: Load code snippet
export const loadCode = async (codeId) => {
  const res = await axios.get(`${API_BASE_URL}/code/${codeId}`);
  return res.data;
};

// POST: Get AI hint
export const getHint = async ({ language, code }) => {
  const res = await axios.post(`${API_BASE_URL}/ai/hint`, {
    language,
    code
  });
  return res.data.hint;
};
