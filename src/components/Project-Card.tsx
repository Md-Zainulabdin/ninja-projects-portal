"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@clerk/nextjs/server";
import UserCard from "@/app/(main)/(routes)/_components/UserCard";

interface ProjectCardProps {
  projects: Project[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projects }) => {
  return (
    <div>
      <div className="flex items-start gap-8 flex-wrap">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative w-[380px] h-[325px] border transition duration-500 ease-in-out cursor-pointer rounded-md hover:shadow-xl overflow-hidden"
          >
            <div className="absolute z-20 top-2 right-2">
              <Link href={project.liveUrl} target="_blank">
                <Button variant={"outline"} size={"icon"}>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="relative overflow-hidden h-[200px] border-b">
              <Image
                fill
                className="object-cover"
                src={project.imageUrl}
                alt="Project Image"
              />
            </div>

            <div className="project-desc p-3">
              <h1 className="text-lg font-medium">{project.title}</h1>
              <Separator className="my-4" />

              <UserCard />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
