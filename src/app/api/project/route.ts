import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

type ProjectData = {
  title: string;
  description: string;
  userId: string;
  imageUrl: string;
  liveUrl: string;
  techs: string[];
};

export const POST = async (req: NextRequest) => {
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

    const project = await prismadb.project.create({
      data: projectData,
    });

    return NextResponse.json(project, {
      status: 201,
      statusText: "Project Created!",
    });
  } catch (error) {
    console.log("PROJECT-POST : ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
