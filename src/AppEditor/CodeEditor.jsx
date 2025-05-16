import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import escapeDoubleQuotes from "./helpers";

const OnlineCompiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [languageId, setLanguageId] = useState(63); 
  const [input, setInput] = useState("");

  const handleRun = async () => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "4ffe7fd1d8msh2dc4bece5f0a33ap11b49cjsne67c45732e3c",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        source_code: code,
        stdin: input,
        language_id: languageId,
      },
    };

    const submission = await axios.request(options);
    const token = submission.data.token;

    // Polling
    let result = null;
    while (!result || result.status?.id <= 2) {
      const res = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          params: { base64_encoded: "false", fields: "*" },
          headers: options.headers,
        }
      );
      result = res.data;
      if (result.status?.id > 2) {
        setOutput(result.stdout || result.stderr || result.compile_output);
        break;
      }
    }
  };

  return (
    <div className="p-4 flex-1">
      <select onChange={(e) => setLanguageId(e.target.value)}>
        <option value="63">C++</option>
        <option value="71">Python</option>
        <option value="62">Java</option>
        <option value="54">C</option>
        {/* Add more language IDs as needed */}
      </select>

      <Editor
        height="300px"
        language="cpp"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <textarea
        placeholder="Input (if any)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border mt-2"
      ></textarea>

      <button
        onClick={handleRun}
        className="bg-blue-600 text-white px-4 py-2 mt-2"
      >
        Run Code
      </button>

      <div className="mt-4 bg-black text-white p-3">
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default OnlineCompiler;
