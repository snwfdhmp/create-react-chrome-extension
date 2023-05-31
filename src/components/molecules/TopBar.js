import React, { useState } from "react"
import { useContent } from "../hooks/useContent"
import { fetchAnswer, fetchSummary, useSummary } from "../hooks/useSummary"

const summarize = (apiKey, content, setSummary, setActionState) => {
  fetchSummary(apiKey, content, setActionState)
  setSummary("")
}

const ask = (
  apiKey,
  content,
  setContent,
  askInput,
  setAskInput,
  setActionState,
) => {
  fetchAnswer(apiKey, content, askInput, setActionState)
  setAskInput("")
}

export const TopBar = ({
  apiKey,
  content,
  setContent,
  actionState,
  setActionState,
}) => {
  const [askInput, setAskInput] = useState("")
  const [summary, setSummary] = useSummary()

  const action =
    askInput === ""
      ? () => summarize(apiKey, content, setSummary, setActionState)
      : () =>
          ask(
            apiKey,
            content,
            setContent,
            askInput,
            setAskInput,
            setActionState,
          )

  // let btnText = actionState ? (
  //   <span>
  //     <span style={{ fontSize: "0.8em", lineHeight: "0.8em" }}>
  //       {actionState.split(" ")[0]}
  //     </span>
  //     <br />
  //     <span style={{ fontSize: "0.6em", lineHeight: "0.6em" }}>
  //       {actionState.split(" ").slice(1).join(" ")}
  //     </span>
  //   </span>
  // ) : askInput === "" ? (
  //   "Summarize"
  // ) : (
  //   "Ask"
  // )

  let btnText = actionState
    ? actionState
    : askInput === ""
    ? "Summarize"
    : "Ask"

  return (
    <p style={{ marginTop: "0px", marginBottom: "5px" }}>
      <input
        type="text"
        id="ask-input"
        placeholder="Ask anything...      or click Summarize →"
        value={askInput}
        onChange={(e) => setAskInput(e.target.value)}
        style={{
          width: "250px",
          borderRadius: "4px",
          border: "1px solid #666",
          padding: "0.5em",
          outline: "none",
        }}
        autoFocus={true}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            action()
          }
        }}
      />
      <button
        id="validate-button"
        style={{
          padding: "0.5em",
          marginLeft: "5px",
          border: "1px solid #666",
          borderRadius: "4px",
          backgroundColor: "#F9F9FB",
          cursor: "pointer",
          width: "85px",
          outline: "none",
        }}
        disabled={!apiKey}
        onClick={() => {
          action()
        }}
      >
        {btnText}
      </button>
    </p>
  )
}
