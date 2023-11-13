import prismadb from "@/lib/prismadb";

import Hero from "@/app/(main)/(routes)/(root)/components/Hero";
import ProjectCard from "@/app/(main)/(routes)/(root)/components/Project-Card";
import FilterOptions from "@/components/FilterOptions";
import { Separator } from "@/components/ui/separator";

const Home = async () => {
  const projects = await prismadb.project.findMany({});

  return (
    <>
      <div className="py-12">
        <Hero />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium ">See All Latest Projects</h2>
        <FilterOptions />
      </div>

      <div className="py-8">
        <Separator />
      </div>

      <div>
        <ProjectCard projects={projects} />
      </div>
    </>
  );
};

export default Home;
