import React, { useEffect, useState } from "react"

const PREPROMPT_SUMMARY_CLASSIC = `
You are an internet browsing assistant.
Summarize the following webpage text content using bullet points.
The content is messy and contains useless information, you have to filter it.
Use concise sentences.
Always respond in the initial webpage language. For example, if the webpage is in french, respond in french.
`

const PREPROMPT_SUMMARY_SUDOLANG = `
# InternetBrowsingAssistant

You are an internet browsing assistant. You an expert in summarizing webpages.
Your job is to summarize the following webpage text content to the reader using bullet points.

function list():format=numbered markdown

InternetBrowsingAssistant {
  State {
    Information {
      Description
    }
  }
  Constraints {
    Use bullet points.
    Use concise sentences.

    Instruct the AI:
    - Always respond in the initial webpage language. For example, if the webpage is in french, respond in french.
    - Focus on the main content of the webpage. Ignore the rest.
    - Filter out useless information.
    - Always write in bullet points preceded by a dash (-).
  }
  /list - List current property settings
}
`

const PREPROMPT_ASK_SUDOLANG = `
# InternetBrowsingAssistant

You are an internet browsing assistant. You an expert in extracting information from a webpage.
Your job is to answer user questions about the following webpage text content.
The question is always the first line of the input.

function list():format=numbered markdown

InternetBrowsingAssistant {
  State {
    Information {
      Description
    }
  }
  Constraints {
    Use bullet points.
    Use concise sentences.

    Instruct the AI:
    - Always respond in the initial webpage language. For example, if the webpage is in french, respond in french.
    - Focus on the main content of the webpage. Ignore the rest.
    - Filter out useless information.
    - Always write in bullet points preceded by a dash (-).
  }
  /list - List current property settings
}
`

const PREPROMPT_SUMMARY = PREPROMPT_SUMMARY_SUDOLANG

let appendToSummary = () => {
  console.log("appendToSummary not initialized")
}

export const MAX_MESSAGE_LENGTH = 12000

export const useSummary = () => {
  const [summary, setSummary] = useState("")

  // useEffect(() => {
  //   sendRequest(prompt)
  // }, [prompt])

  useEffect(() => {
    appendToSummary = (toAppend) => {
      setSummary(summary + toAppend)
    }
  }, [summary])

  return [summary, setSummary]
}

export const fetchSummary = async (apiKey, prompt, setActionState) => {
  if (!prompt || prompt.length === 0) return
  // divide prompt into chunks of maximum 12000 characters, cut at sentence boundaries (.?!\n)
  setActionState("Parsing")
  const promptChunks = []
  let currentChunk = ""
  const sentences = prompt.split(/([.?!\r\n])/g)
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i]
    if (currentChunk.length + sentence.length > MAX_MESSAGE_LENGTH) {
      promptChunks.push(currentChunk)
      currentChunk = sentence
    } else {
      currentChunk += sentence
    }

    if (i === sentences.length - 1) {
      promptChunks.push(currentChunk)
    }
  }

  for (let i = 0; i < promptChunks.length; i++) {
    console.log("fetchSummary", i, promptChunks.length)
    await fetchSummaryPart(apiKey, promptChunks, i, setActionState)
  }
}

export const fetchSummaryPart = async (
  apiKey,
  promptChunks,
  i,
  setActionState,
) => {
  const messages = [
    {
      role: "system",
      content: PREPROMPT_SUMMARY,
    },
    {
      role: "user",
      content: promptChunks[i],
    },
  ]

  await fetchApiStream(
    apiKey,
    messages,
    setActionState,
    (e) => appendToSummary(e),
    i,
    promptChunks.length,
  )
}

export const fetchAnswer = async (
  apiKey,
  content,
  askInput,
  setActionState,
) => {
  const messages = [
    {
      role: "system",
      content: PREPROMPT_ASK_SUDOLANG,
    },
    {
      role: "user",
      content: askInput + "\n\n" + content.slice(0, MAX_MESSAGE_LENGTH),
    },
  ]

  await fetchApiStream(
    apiKey,
    messages,
    setActionState,
    (e) => appendToSummary(e),
    1,
    1,
  )
}

export const fetchApiStream = async (
  apiKey,
  messages,
  setActionState,
  appendData,
  partIndex = 1,
  partTotal = 1,
) => {
  setActionState(
    `Send${partTotal > 1 ? ` (${partIndex + 1}/${partTotal})` : ""}`,
  )
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.1,
    stream: true,
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  })
  setActionState(
    `Think${partTotal > 1 ? ` (${partIndex + 1}/${partTotal})` : ""}`,
  )

  //handle error
  if (!response.ok) {
    const error = await response.json()
    console.error(
      error.error.message +
        "\n\nPlease reopen the extension and try again.\n\nNote that you can edit the text before summarizing.",
    )
    summarizeButtonTitle.innerHTML = "Error"
    return
  }

  const reader = response.body.getReader()
  let result = await reader.read()
  let decoder = new TextDecoder("utf-8")
  let partialData = ""

  while (!result.done) {
    partialData += decoder.decode(result.value, { stream: true })

    while (partialData.includes("data:")) {
      const startIndex = partialData.indexOf("data:")
      const endIndex = partialData.indexOf("\n", startIndex)
      const messageData = partialData.slice(startIndex + 5, endIndex).trim()

      if (messageData) {
        const message = JSON.parse(messageData)
        const content = message.choices[0].delta.content

        if (message.choices[0].finish_reason === "stop") {
          summarizeButtonTitle.innerHTML = "Summarize"
          appendData("\n")
          setActionState("")
          // Last message received, stop processing
          return
        }

        if (content) {
          appendData(content)
        }
      }

      partialData = partialData.slice(endIndex + 1)
    }

    result = await reader.read()
  }
}
