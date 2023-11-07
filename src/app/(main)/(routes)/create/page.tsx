import Heading from "@/components/ui/Heading";
import React from "react";
import CreateProjectForm from "./_components/CreateProjectForm";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div>
      <div className="py-6">
        <Heading
          title="Create Project"
          description="create project to showcase your skills"
        />
      </div>

      <Separator/>

      <div className="w-full max-w-xl py-8">
        <CreateProjectForm />
      </div>
    </div>
  );
};

export default page;
