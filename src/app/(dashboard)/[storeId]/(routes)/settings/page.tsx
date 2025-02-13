import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { SettingsForm } from "@/components/dashboard/settings/settings-form";

interface SettingsPageProps {
  params: Promise<{ storeId: string }>;
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const { userId, redirectToSignIn } = await auth();
  const { storeId } = await params;

  if (!userId) return redirectToSignIn();

  const store = await prismadb.store.findFirst({
    where: { id: storeId, userId },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
