import React, { useState, useEffect } from "react"

export const useContent = () => {
  const [content, setContent] = useState("")

  useEffect(() => {
    loadContent({ setContent })
  }, [])

  return [content, setContent]
}

const loadContent = ({ setContent }) => {
  // send message to content.js to get current content
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message: "getWebPageContent" },
      function (response) {
        console.log({ response })
        setContent(response.content)
      }
    )
  })
}
