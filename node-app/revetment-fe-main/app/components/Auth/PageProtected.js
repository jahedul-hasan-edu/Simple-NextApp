"use client";
import React, { useLayoutEffect, useState, useCallback, memo } from "react";
import { LoaderSection } from "../Common";
import { API } from "../../../API";
import { redirect } from "next/navigation";
import { userInfo } from "../signal";
const PageProtected = ({ children, loaderTitle }) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const auth = useCallback(() => {
    if (!localStorage.getItem("revetment-token")) {
      redirect("/sign-in");
    } else {
      API.defaults.headers.common["Authorization"] =
        localStorage.getItem("revetment-token");
      const data = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.value = data;
      setIsLogIn(true);
    }
  }, []);

  useLayoutEffect(() => {
    auth();
  }, []);

  return (
    <>
      {/* <LoaderSection state={loaderState} /> */}
      {isLogIn && <>{children}</>}
    </>
  );
};

export default memo(PageProtected);
