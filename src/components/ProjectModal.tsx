"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { Project } from "@prisma/client";

import { useProjectID } from "@/hooks/PorjectId";
import { useProjectModal } from "@/hooks/modal";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight } from "lucide-react";

interface User {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  emailAddresses?: { id: string; emailAddress: string }[];
}

const ProjectModal = () => {
  const [user, setUser] = useState<User>({});
  const projectModal = useProjectModal();
  const projectID = useProjectID();

  const [project, setProject] = useState<Project | undefined>();

  useEffect(() => {
    if (projectID.id === "") {
      return;
    }

    axios
      .get(`/api/project/${projectID.id}`)
      .then((res) => {
        setProject(res.data?.project);
        setUser(res.data?.user);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something Went Wrong!");
      });
  }, [projectID.id]);

  return (
    <Modal
      title={project?.title || "Project Title"}
      description={project?.description || "Project Description"}
      isOpen={projectModal.isOpen}
      onClose={projectModal.onClose}
    >
      <div>
        <div className="img-src rounded-xl overflow-hidden">
          {!project?.imageUrl ? (
            <Skeleton className="w-full h-[200px] rounded-xl" />
          ) : (
            <Image
              width={1000}
              height={120}
              src={project?.imageUrl || "/dummy-image.jpg"}
              alt="Porject-Image rounded-xl"
            />
          )}
        </div>

        <div className="user-card mt-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="logo">
                <Link href={"/profile"}>
                  <Image
                    src={user?.imageUrl || "/dummy-profile.jpg"}
                    width={40}
                    height={40}
                    alt="Profile Image"
                    className="rounded-full"
                  />
                </Link>
              </div>
              <div className="desc flex flex-col">
                <h2 className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {user?.emailAddresses?.map((data) => (
                    <span key={data.id}>{data.emailAddress}</span>
                  ))}
                </p>
              </div>
            </div>

            <Link href={project?.liveUrl || ""} target="_blank">
              <Button size={"sm"} variant={"outline"}>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
