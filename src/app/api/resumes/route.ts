import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { id, title, content: rawContent, template, color, font, spacing } = body;
    const content = typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    let resume;

    if (id) {
      // Update existing
      resume = await prisma.resume.update({
        where: { id },
        data: {
          title,
          content,
          template,
          color,
          font,
          spacing,
          lastEdited: new Date(),
        }
      });
    } else {
      // Create new
      resume = await prisma.resume.create({
        data: {
          userId: user.id,
          title,
          content,
          template,
          color,
          font,
          spacing,
        }
      });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error("[RESUME_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

      if (id) {
      const resume = await prisma.resume.findUnique({
        where: { id }
      });
      if (resume) {
        resume.content = typeof resume.content === 'string' ? JSON.parse(resume.content) : resume.content;
      }
      return NextResponse.json(resume);
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        resumes: {
          orderBy: {
            updatedAt: 'desc'
          }
        }
      }
    });

    const formattedResumes = (user?.resumes || []).map(r => ({
      ...r,
      content: typeof r.content === 'string' ? JSON.parse(r.content) : r.content
    }));

    return NextResponse.json(formattedResumes);
  } catch (error) {
    console.error("[RESUME_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
