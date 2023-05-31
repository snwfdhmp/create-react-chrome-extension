/*global chrome*/
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"

// console.log = (data) => {
//   console.log(data)
//   // if chrome is defined
//   // if (chrome) chrome.runtime.sendMessage({ message: "log", data })
// }

console.log("index.js loading...")

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
