import BackBtn from "@/components/ui/Backbtn";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { ChevronRight, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const project = await prismadb.project.findUnique({
    where: {
      id: params.projectId,
    },
  });

  return (
    <div>
      <div>
        <BackBtn />
      </div>

      <div>
        <div className="parent mt-12 flex items-start justify-between gap-8 flex-col ">
          <div className="project-desc space-y-7">
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground text-sm hover:underline">
                <Link href={"/"}>Home</Link>
              </span>

              <ChevronRight className="w-4 h-4 text-muted-foreground" />

              <span className="text-sm font-medium">Project</span>
            </div>

            <div className="max-w-[550px] space-y-2">
              <h1 className="text-4xl font-bold text-[#222]">
                {project?.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {project?.description}
              </p>
            </div>

            <div className="flex space-x-4 cursor-pointer">
              {project?.techs.map((tech) => (
                <div
                  key={tech}
                  className="border px-3 py-1 rounded-md border-indigo-500 text-indigo-500"
                >
                  {tech}
                </div>
              ))}
            </div>

            <div className="flex space-x-4 mt-3">
              <Link href={project?.liveUrl || "/"} target="_blank">
                <Button size={"lg"}>
                  <Link2 className="w-5 h-5 mr-2" />
                  Live Preview
                </Button>
              </Link>
            </div>
          </div>
          <div className="project-img">
            <div>
              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image
                      src={project?.imageUrl || "/"}
                      alt="product preview"
                      width={1400}
                      height={866}
                      quality={100}
                      className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
