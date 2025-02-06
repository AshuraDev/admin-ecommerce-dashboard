import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { Navbar } from "@/components/dashboard/navigation/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}
