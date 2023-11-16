import React from "react";
import UserCard from "../(root)/components/UserCard";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Separator } from "@/components/ui/separator";

const page = async () => {
  const { userId } = auth();

  const projects = await prismadb.project.findMany({
    where: {
      userId: userId || "",
    },
  });

  return (
    <div>
      <div className="mt-12">
        <UserCard />
      </div>

      <div className="py-10">
        <Separator />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Manage projects:</h2>
      </div>

      <div className="mt-4">
        <DataTable columns={columns} data={projects} />
      </div>
    </div>
  );
};

export default page;
