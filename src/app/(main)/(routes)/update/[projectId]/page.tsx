import React from "react";

import UpdateProjectForm from "../_components/UpdateProjectForm";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

const CreateProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const initialData = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
    },
  });

  return (
    <div className="flex-col">
      <div className="w-full py-6">
        <UpdateProjectForm initialValue={initialData} />
      </div>
    </div>
  );
};

export default CreateProjectPage;
