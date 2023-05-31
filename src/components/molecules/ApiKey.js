import React from "react"
import Style from "./ApiKey.css"

// ask user to enter api key
export const ApiKey = ({ apiKey, setApiKey }) => {
  let inputClassnames = []

  if (apiKey) {
    inputClassnames.push("apikey-missing")
  } else {
    inputClassnames.push("apikey-valid")
  }

  // match again openai api key format
  const apiKeyIsValid = apiKey.match(/^sk-[a-zA-Z0-9]{48}$/)

  return (
    <span style={{ color: "#888", fontSize: "0.9em" }}>
      <label htmlFor="api-key" style={{ marginRight: "0.2em" }}>
        API key:
      </label>
      <input
        type="text"
        value={apiKey}
        onInput={(e) => setApiKey(e.target.value)}
        placeholder="Enter key"
        className={inputClassnames.join(" ")}
        style={{
          width: apiKeyIsValid ? "40px" : "60px",
          borderRadius: "4px",
          fontSize: "0.9em",
          outline: "none",
          border: apiKeyIsValid ? "1px solid #ccc" : "2px dotted #f66",
          backgroundColor: apiKeyIsValid ? "#dfdfdf" : "#f66",
          color: apiKeyIsValid ? "#111" : "#fff",
          fontFamily: "monospace",
        }}
      />
    </span>
  )
}
