import { useState, useEffect } from "react"

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState("")

  // try read api key from local storage
  useEffect(() => {
    chrome.storage.local.get(["apiKey"], (result) => {
      if (result.apiKey !== apiKey) setApiKey(result.apiKey)
    })
  }, [apiKey, setApiKey])

  const setApiKeyWithLocalStorage = (apiKey) => {
    setApiKey(apiKey)
    chrome.storage.local.set({ apiKey: apiKey })
  }

  return [apiKey, setApiKeyWithLocalStorage]
}
