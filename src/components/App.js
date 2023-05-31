/*global chrome*/
import React, { useState, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./views/Home"
import AnotherView from "./views/Another"
import NoMatchView from "./views/NoMatch"

const App = () => {
  // current text content
  const [content, setContent] = useState("")
  // user prompt
  const [userPrompt, setUserPrompt] = useState("")

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/index.html",
    element: <Home />,
  },
  {
    path: "another",
    element: <AnotherView />,
  },
  {
    path: "*",
    element: <NoMatchView />,
  },
])
