"use client";
import { useLayoutEffect, memo, useCallback } from "react";
import { redirect, useRouter } from "next/navigation";
import { API } from "../../../API";
import { userInfo } from "../signal";
const ProtectedRoutes = ({}) => {
  const router = useRouter();

  const auth = useCallback(() => {
    if (!localStorage.getItem("revetment-token")) {
      redirect("/sign-in");
    } else {
      API.defaults.headers.common["Authorization"] =
        localStorage.getItem("revetment-token");
      const data = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.value = data;
      router.push("/dashboard");
    }
  }, []);
  useLayoutEffect(() => {
    auth();
  }, []);
};

export default memo(ProtectedRoutes);
