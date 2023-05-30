import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home";
import AnotherView from "./views/Another";
import NoMatchView from "./views/NoMatch";

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
]);

const App = () => {
  return (
    <>
      <h1>React loaded</h1>
      {/* <p>{location}</p> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
