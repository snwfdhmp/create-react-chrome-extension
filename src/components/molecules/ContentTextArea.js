import React from "react"
import { useContent } from "../hooks/useContent"
import { useSummary } from "../hooks/useSummary"

export const ContentTextArea = ({ content, setContent, apiKey }) => {
  const [summary, setSummary] = useSummary({ prompt: null })

  return (
    <>
      <textarea
        style={{
          width: "355px",
          height: "375px",
          borderRadius: "4px",
          border: "1px solid #666",
          padding: "0.5em",
          boxSizing: "border-box",
          outline: "none",
          marginBottom: 0,
          // resize: "none",
        }}
        id="content-textarea"
        placeholder={"Paste your content here"}
        value={
          !apiKey
            ? `Missing API Key\n\nEnter your API Key in the red box below`
            : summary || content
        }
        onInput={(e) => {
          setContent(e.target.value)
        }}
      />
    </>
  )
}
