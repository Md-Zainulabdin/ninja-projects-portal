import prismadb from "@/lib/prismadb";
import { ProjectData } from "@/types";
import { auth, clerkClient } from "@clerk/nextjs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { projectId: string } }
) => {
  const { userId } = auth();

  if (!params.projectId || !userId) {
    return new NextResponse("All feilds are required!", { status: 500 });
  }

  try {
    const project = await prismadb.project.findUnique({
      where: {
        id: params.projectId,
      },
    });

    const user = await clerkClient.users.getUser(project?.userId || "");

    return NextResponse.json({ project, user }, { status: 200 });
  } catch (error) {
    console.log("PORJECT-GET", error);
    return new NextResponse("Internal Error", { status: 400 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { projectId: string } }
) => {
  const { userId } = auth();
  const { title, description, imageUrl, liveUrl, techs } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  if (!title || !description || !imageUrl || !liveUrl || !techs) {
    return new NextResponse("All fields are required!", { status: 400 });
  }

  try {
    const projectData: ProjectData = {
      title,
      description,
      userId,
      imageUrl,
      liveUrl,
      techs: techs,
    };

    const project = await prismadb.project.update({
      where: {
        userId: userId,
        id: params.projectId || "",
      },
      data: projectData,
    });

    return NextResponse.json(project, {
      status: 201,
      statusText: "Project Updated!",
    });
  } catch (error) {
    console.log("PROJECT-PATCH : ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { projectId: string } }
) => {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  if (!params.projectId) {
    return new NextResponse("Project ID is required!", { status: 400 });
  }

  try {
    const project = await prismadb.project.deleteMany({
      where: {
        id: params.projectId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECT-DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
