import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateResumeContent } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Please log in to use AI features.", { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return new NextResponse("GEMINI_API_KEY is missing in your .env file.", { status: 500 });
    }

    const { type, data } = await req.json();

    let prompt = "";

    if (type === "summary") {
      prompt = `Generate a professional resume summary for a ${data.role}. 
      Key skills: ${data.skills}. 
      Experience level: ${data.experience}.
      Keep it concise, impactful, and ATS-friendly (3-4 sentences).`;
    } else if (type === "bullet-points") {
      prompt = `Rewrite the following job achievement or responsibility for a resume to be more impactful using action verbs and quantifying results where possible:
      "${data.text}"
      Role: ${data.role}
      Return a list of 3 improved versions.`;
    } else if (type === "skills-suggestion") {
      prompt = `Suggest 10 relevant technical and soft skills for a ${data.role} role. Return as a simple comma-separated list.`;
    }

    const content = await generateResumeContent(prompt);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("[AI_GENERATE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
