import prismadb from "@/lib/prismadb";

import Hero from "@/app/(main)/(routes)/projects/_components/Hero";
import ProjectCard from "@/app/(main)/(routes)/projects/_components/Project-Card";
import FilterOptions from "@/components/FilterOptions";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading";

const ProjectsPage = async () => {
  const projects = await prismadb.project.findMany({});

  return (
    <>

      <div className="project-bg w-full h-[50vh] absolute top-[80px] left-0 -z-10 opacity-20"/>

      <div className="w-full py-12">
        <Hero />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold ">See All Latest Projects</h2>
        </div>
        <FilterOptions />
      </div>

      <div className="py-8">
        <Separator />
      </div>

      <div className="pb-12">
        <ProjectCard projects={projects} />
      </div>
    </>
  );
};

export default ProjectsPage;
