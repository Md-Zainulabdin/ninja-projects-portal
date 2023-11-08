import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = auth();
  const { title, description, imageUrl, liveUrl } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  if (!title || !description || !imageUrl || !liveUrl) {
    return new NextResponse("All fields are required!", { status: 400 });
  }

  try {
    const project = await prismadb.project.create({
      data: {
        title,
        description,
        userId,
        imageUrl,
        liveUrl,
      },
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
