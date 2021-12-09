import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
function index() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["token"];
    router.push("./login");
  };
  useEffect(() => {
    logout();
  });
  return <div></div>;
}

export default index;
