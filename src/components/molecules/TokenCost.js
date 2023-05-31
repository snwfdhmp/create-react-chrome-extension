import React from "react"
import { MAX_MESSAGE_LENGTH } from "../hooks/useSummary"

export const TokenCost = ({ content }) => {
  const tokenCount = Math.ceil(content.length / 3)
  const price = ((tokenCount * 0.002) / 1000).toFixed(4)
  const parts = Math.ceil(content.length / MAX_MESSAGE_LENGTH)

  const partsDisplay = parts > 1 ? ` ~${parts} parts` : ""

  const priceThreshold = 0.01
  const style = price > priceThreshold ? { fontWeight: "900" } : {}

  return (
    <p
      style={{
        color: "#666",
        margin: "0em",
        marginBottom: "5px",
        fontSize: "0.9em",
        ...style,
      }}
    >
      ~{tokenCount} tokens <span>~{price}$</span>
      {partsDisplay}
    </p>
  )
}
