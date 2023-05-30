import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

const AnotherView = () => {
  return (
    <Layout>
      <h2>Another View</h2>
      <p>This is a second view of this extension</p>
      <Link to="/">Go back to the home view</Link>
    </Layout>
  );
};

export default AnotherView;
