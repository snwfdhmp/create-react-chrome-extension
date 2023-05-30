import React from "react";
import { useLocation, Link } from "react-router-dom";

import Layout from "../Layout";

const NoMatchView = () => {
  const location = useLocation();
  return (
    <Layout>
      <h2>View not found</h2>
      <p>
        Path: <strong>{location.pathname}</strong>
      </p>
      <Link to="/">Go home</Link>
    </Layout>
  );
};

export default NoMatchView;
