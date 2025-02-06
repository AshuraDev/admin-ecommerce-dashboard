import React from "react";

import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/dashboard/navigation/main-nav";
import { StoreSwitcher } from "@/components/dashboard/navigation/store-switcher";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export const Navbar = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const store = await prismadb.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={store}/>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
