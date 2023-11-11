"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useProjectModal } from "@/hooks/modal";
import { useProjectID } from "@/hooks/PorjectId";

interface ProjectCardProps {
  projects: Project[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
  const projectModal = useProjectModal();
  const projectID = useProjectID();
  return (
    <div>
      <div className="flex items-start gap-6 flex-wrap">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative w-[365px] transition duration-500 ease-in-out cursor-pointer rounded-md hover:shadow-xl overflow-hidden"
          >
            <div className="absolute z-20 top-2 right-2">
              <Link href={project.liveUrl} target="_blank">
                <Button variant={"outline"} size={"icon"}>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="relative overflow-hidden h-[200px] border-b">
              <div className="overlay w-full h-full absolute top-0 left-0 z-10 opacity-50"></div>
              <Image
                fill
                className="object-cover"
                src={project.imageUrl}
                alt="Project Image"
              />
            </div>

            <div className="project-desc px-3 pt-2 pb-4">
              <h1 className="text-lg font-semibold">{project.title}</h1>
              <p className="text-sm text-muted-foreground mt-1" id="_paragraph">
                {project.description}
              </p>

              <div className="detail-modal flex items-center space-x-2 mt-2">
                <span
                  className="text-sm text-indigo-500 hover:underline"
                  onClick={() => {
                    projectModal.onOpen();
                    projectID.setProjectId(project.id);
                  }}
                >
                  Details
                </span>
                {/* <ArrowRight className="w-4 h-4 text-indigo-500" /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
