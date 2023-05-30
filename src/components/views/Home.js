import React from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout";

const HomeView = () => {
  return (
    <Layout>
      <h2>Home view</h2>
      <p>React Popup Chrome Extension</p>
      <p>
        <Link to="/another">Navigate to another view</Link>
        <br />
        <Link to="/something-unknown">Navigate to 404 view</Link>
      </p>
    </Layout>
  );
};

export default HomeView;
