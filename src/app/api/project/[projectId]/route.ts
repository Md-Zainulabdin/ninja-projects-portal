import prismadb from "@/lib/prismadb";
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
