import prismadb from "@/lib/prismadb";

import Hero from "@/components/Hero";
import ProjectCard from "@/components/Project-Card";

const Home = async () => {

  const projects = await prismadb.project.findMany({});

  return (
    <>
      <div className="p-12">
        <Hero />
      </div>

      <div>
        <ProjectCard projects={projects} />
      </div>
    </>
  );
};

export default Home;
