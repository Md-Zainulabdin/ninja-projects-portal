import React from "react";
import UserCard from "../(root)/components/UserCard";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const page = async () => {
  const { userId } = auth();

  const projects = await prismadb.project.findMany({
    where: {
      userId: userId || "",
    },
  });

  return (
    <div>
      <div className="border flex items-center justify-between rounded-xl p-10">
        <div className="w-full space-y-4">
          <h2 className="text-xl font-semibold text-muted-foreground">
            Total Projects
          </h2>
          <h1 className="text-7xl font-semibold text-[#222]">
            {(projects?.length < 10)
              ? `0${projects?.length}`
              : `${projects.length}`}
          </h1>
        </div>
        <div className="profile-card bg-white rounded-xl py-8 shadow-md border">
          <UserCard />
        </div>
      </div>
    </div>
  );
};

export default page;
