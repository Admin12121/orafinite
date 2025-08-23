'use client'

import React from "react";
import { useAuthUser } from "@/hooks/use-auth-user";

const Dashboard = () => {
  const { user, status, expire } = useAuthUser();

  console.log(user, status, expire);

  return <div>Dashboard</div>;
};

export default Dashboard;
