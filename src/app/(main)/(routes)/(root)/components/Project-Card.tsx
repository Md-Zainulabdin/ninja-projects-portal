"use client";

// Import necessary libraries and components
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";

import { useFilter } from "@/hooks/ProjectFilter";

// Define interface for the props
interface ProjectCardProps {
  projects: Project[];
}

// Define the ProjectCard component
const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
  // Get the filter state from the custom hook
  const filter = useFilter((state) => state.filter);

  // State to hold the filtered projects
  const [filterProject, setFilterProject] = useState<Project[]>(projects);

  // Effect to filter projects based on the selected tech stack
  useEffect(() => {
    // If the filter is set to "all," show all projects
    if (filter.toLowerCase() === "all") {
      setFilterProject(projects);
      return;
    }

    // Filter projects based on the selected tech stack
    const filteredProjects = projects.filter((item) => {
      return item.techs.some(
        (tech) => tech.toLowerCase() === filter.toLowerCase()
      );
    });

    // Update the state with filtered projects
    setFilterProject(filteredProjects);
  }, [filter, projects]);

  // Render the component
  return (
    <div>
      <div className="flex items-start gap-6 flex-wrap">
        {filterProject.length !== 0 ? (
          filterProject.map((project) => (
            <div
              key={project.id}
              className="relative w-[365px] transition duration-500 ease-in-out cursor-pointer rounded-md hover:shadow-xl overflow-hidden"
            >
              {/* Link to the live project */}
              <div className="absolute z-20 top-2 right-2">
                <Link href={project.liveUrl} target="_blank">
                  <Button variant={"outline"} size={"icon"}>
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Project image */}
              <div className="relative overflow-hidden h-[200px] border-b">
                <div className="overlay w-full h-full absolute top-0 left-0 z-10 opacity-50"></div>
                <Image
                  fill
                  className="object-cover"
                  src={project.imageUrl}
                  alt="Project Image"
                />
              </div>

              {/* Project details */}
              <div className="project-desc px-3 pt-2 pb-4">
                <h1 className="text-lg font-semibold">{project.title}</h1>
                <p
                  className="text-sm text-muted-foreground mt-1"
                  id="_paragraph"
                >
                  {project.description}
                </p>

                {/* Link to project details page */}
                <div className="detail-modal flex items-center space-x-2 mt-2">
                  <Link href={`/projects/${project.id}`}>
                    <span className="text-sm text-indigo-500 hover:underline">
                      Details
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>Nothing to Show</h1>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the ProjectCard component
export default ProjectCard;
