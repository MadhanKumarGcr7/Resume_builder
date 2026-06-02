import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateResumeContent } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { resumeData, jobDescription } = await req.json();

    const prompt = `Act as an expert ATS (Applicant Tracking System) analyzer. 
    Analyze the following resume against the job description provided.
    
    Resume content: ${JSON.stringify(resumeData)}
    
    Job Description: ${jobDescription}
    
    Provide a detailed report in JSON format with:
    1. A score from 0-100.
    2. Missing keywords.
    3. Formatting suggestions.
    4. Content improvement tips.
    5. Match percentage.
    
    Format example: { "score": 85, "missingKeywords": ["React", "AWS"], "suggestions": ["Add more about leadership"], "matchPercentage": 80 }
    Return ONLY the JSON.`;

    const result = await generateResumeContent(prompt);
    
    // Attempt to parse JSON from the response (sometimes AI adds markdown blocks)
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse analysis" };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("[AI_ANALYZE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
