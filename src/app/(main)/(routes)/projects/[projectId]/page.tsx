import Image from "next/image";
import Link from "next/link";

import { auth, clerkClient } from "@clerk/nextjs";
import { ArrowUpRight, Edit2 } from "lucide-react";

import BackBtn from "@/components/ui/Backbtn";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { Separator } from "@/components/ui/separator";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
    },
  });

  const { userId } = auth();
  const user = await clerkClient.users.getUser(project?.userId || "");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex self-end">
          <BackBtn />
        </div>
        <div className="space-x-3">
          {userId === project?.userId ? (
            <Link href={`/update/${project?.id}`}>
              <Button size={"icon"} variant={"secondary"}>
                {" "}
                <Edit2 className="w-4 h-4" />
              </Button>
            </Link>
          ) : null}

          <Button size={"icon"} color="#222">
            <Link href={project?.liveUrl || "/"} target="_blank">
              {" "}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <div className="parent pb-12 mt-12 flex items-start justify-between gap-8 flex-col ">
          <div className="project-desc w-full space-y-7 pb-12">
            <div className="w-full flex flex-col items-center justify-center text-center space-y-2">
              <h1 className="text-5xl font-semibold text-[#222]">
                {project?.title}
              </h1>
              <p className="text-xl max-w-[600px] text-muted-foreground">
                {project?.description}
              </p>
            </div>

            <div className="w-full flex items-center justify-center space-x-4 cursor-pointer">
              {project?.techs.map((tech) => (
                <div
                  key={tech}
                  className="border px-3 py-1 rounded-md border-blue-500 text-blue-500"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
          <div className="project-img w-full flex items-center justify-center">
            <div className="w-full rounded-xl p-3 bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src={project?.imageUrl || "/"}
                alt="product preview"
                width={1200}
                height={500}
                // quality={100}
                className="w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <Separator />
      </div>

      <div>
        <div className="user-card flex-col text-center flex items-center space-y-3 py-6">
          <div>
            <Image
              src={user?.imageUrl}
              alt="Profile Image"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>

          <div>
            <h1 className="font-medium">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses.map((email) => (
                <span>{email?.emailAddress}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
