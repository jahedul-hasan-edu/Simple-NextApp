"use client";
import React, { memo } from "react";
import Layout from "../components/layout";
import PageProtected from "../components/Auth/PageProtected";
const layout = ({ children }) => {
  return (
    <PageProtected>
      <Layout>{children}</Layout>
    </PageProtected>
  );
};

export default memo(layout);
