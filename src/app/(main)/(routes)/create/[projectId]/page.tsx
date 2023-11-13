import React from "react";
import Heading from "@/components/ui/Heading";
import CreateProjectForm from "../_components/CreateProjectForm";
import { Separator } from "@/components/ui/separator";

const CreateProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {

  return (
    <div>
      <div className="py-6">
        <Heading
          title="Create Project"
          description="create project to showcase your skills"
        />
      </div>

      <Separator />

      <div className="w-full max-w-xl py-6">
        <CreateProjectForm />
      </div>
    </div>
  );
};

export default CreateProjectPage;
